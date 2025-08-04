"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = __importDefault(require("zod"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.default.object({
    PORT: zod_1.default.string(),
    NODE_ENV: zod_1.default.enum(["production", "development"]),
    DB_URL: zod_1.default.url(),
    BCRYPT_SALT_ROUND: zod_1.default.string(),
    JWT_ACCESS_SECRET: zod_1.default.string(),
    JWT_ACCESS_EXPIRES: zod_1.default.string(),
    JWT_REFRESH_SECRET: zod_1.default.string(),
    JWT_REFRESH_EXPIRES: zod_1.default.any(),
    GRAPH_HOPPER_API_KEY: zod_1.default.string(),
});
const parsed = envSchema.safeParse(process.env);
if (parsed.success === false) {
    const tree = zod_1.default.treeifyError(parsed.error);
    const invalidKeys = Object.keys((_a = tree.properties) !== null && _a !== void 0 ? _a : {});
    console.error("Invalid env variables:", invalidKeys);
    throw new Error('Missing necessary env keys');
}
exports.env = parsed.data;
