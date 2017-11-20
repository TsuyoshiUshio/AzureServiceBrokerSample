import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";

export class IndexRoute extends BaseRoute {
    static create(router: Router) {
        console.log("[IndexRoute::create] Creating index route.");
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().index(req, res, next);
        });
    }
    constructor() {
        super();
    }
    public index(req: Request, res: Response, next: NextFunction) {
        this.title = "Home | Voting Result";
        let options: Object = {
            "message": "Welcome to the editor votings"
        };
         // this.render(req, res, "index", options);
         res.send("hello");
    }
}