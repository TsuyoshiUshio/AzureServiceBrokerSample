"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
const documentdb_typescript_1 = require("documentdb-typescript");
class VoteRoute extends route_1.BaseRoute {
    static create(router) {
        console.log("[VoteRoute::create] Creating vote route.");
        router.get("/vote", (req, res, next) => {
            new VoteRoute().getAsync(req, res, next);
        });
        router.post("/vote", (req, res, next) => {
            new VoteRoute().postAsync(req, res, next);
        });
    }
    constructor() {
        super();
        this.url = process.env.COSMOSDB_URL;
        this.masterKey = process.env.COSMOSDB_MASTER_KEY;
    }
    getAsync(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = new documentdb_typescript_1.Client(this.url, this.masterKey);
            client.enableConsoleLog = true;
            let coll = new documentdb_typescript_1.Collection("test", "sample", client);
            yield coll.openOrCreateDatabaseAsync();
            let allDocsJson = yield coll.queryDocuments().toArray();
            console.log(JSON.stringify(allDocsJson[0]));
            console.log("length: " + allDocsJson.length);
            let allDocs = allDocsJson.map(function (x) {
                return JSON.stringify(x);
            });
            console.log("length: " + allDocsJson.length);
            let result = allDocs.join("");
            res.send(result);
        });
    }
    postAsync(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = new documentdb_typescript_1.Client(this.url, this.masterKey);
            client.enableConsoleLog = true;
            let coll = new documentdb_typescript_1.Collection("test", "sample", client);
            yield coll.openOrCreateDatabaseAsync();
            let doc = req.body;
            yield coll.storeDocumentAsync(doc, documentdb_typescript_1.StoreMode.Upsert);
            res.send("done");
        });
    }
}
exports.VoteRoute = VoteRoute;
