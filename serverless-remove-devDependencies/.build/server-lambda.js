"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverless_http_1 = __importDefault(require("serverless-http"));
const app_1 = require("./app");
const handler = serverless_http_1.default(app_1.app);
module.exports.handler = async (event, context) => {
    return await handler(event, context);
};
//# sourceMappingURL=server-lambda.js.map