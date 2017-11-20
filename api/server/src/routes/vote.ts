import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { Client, Database, Collection, StoreMode } from "documentdb-typescript";



export class VoteRoute extends BaseRoute {
    private url: string;
    private masterKey: string;

    static create(router: Router) {
        console.log("[VoteRoute::create] Creating vote route.");

        router.get("/vote", (req: Request, res: Response, next: NextFunction) => {
            new VoteRoute().getAsync(req, res, next);
        });
        router.post("/vote", (req: Request, res: Response, next: NextFunction) => {
            new VoteRoute().postAsync(req, res, next);
        })
    }
    constructor() {
        super();
        this.url = process.env.COSMOSDB_URL;
        this.masterKey = process.env.COSMOSDB_MASTER_KEY
    }
    public async getAsync(req: Request, res: Response, next: NextFunction) {
        let client = new Client(this.url, this.masterKey);
        client.enableConsoleLog = true;
        let coll = new Collection("test", "sample", client);
        await coll.openOrCreateDatabaseAsync();
        let allDocsJson = await coll.queryDocuments().toArray();
        console.log(JSON.stringify(allDocsJson[0]));
        console.log("length: " + allDocsJson.length);
        let allDocs = allDocsJson.map(function(x) {
            return JSON.stringify(x);});
        console.log("length: " + allDocsJson.length);
        let result = allDocs.join(",");
        res.send("[" + result + "]");
    }
    public async postAsync(req: Request, res: Response, next: NextFunction) {
        let client = new Client(this.url, this.masterKey);
        client.enableConsoleLog = true;
        let coll = new Collection("test", "sample", client);
        await coll.openOrCreateDatabaseAsync();
        let doc = req.body;
        await coll.storeDocumentAsync(doc, StoreMode.Upsert);
        res.send("done");
    }
}