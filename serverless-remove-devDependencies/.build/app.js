"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_router_1 = __importDefault(require("koa-router"));
exports.app = new koa_1.default();
const router = new koa_router_1.default();
exports.app.keys = ["4011BA02E51104C678C31A76A444485B38F3865E504D89C3A0A80B439BB1A237"];
exports.app.use(koa_bodyparser_1.default({ strict: false }));
exports.app.use(router.routes());
router.get("/", async (ctx, next) => {
    ctx.body = "Hello world!";
    await next();
});
//# sourceMappingURL=app.js.map