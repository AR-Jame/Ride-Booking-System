import z from "zod";
import dotenv from 'dotenv'

dotenv.config();

interface IEnv {
    PORT: string;
    NODE_ENV: string;
    DB_URL: string;
    BCRYPT_SALT_ROUND: string;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES: string;
    GRAPH_HOPPER_API_KEY: string;
    FRONTEND_URL: string;
}

const envSchema = z.object({
    PORT: z.string(),
    NODE_ENV: z.enum(["production", "development"]),
    DB_URL: z.url(),
    BCRYPT_SALT_ROUND: z.string(),
    JWT_ACCESS_SECRET: z.string(),
    JWT_ACCESS_EXPIRES: z.string(),
    JWT_REFRESH_SECRET: z.string(),
    JWT_REFRESH_EXPIRES: z.any(),
    GRAPH_HOPPER_API_KEY: z.string(),
    FRONTEND_URL: z.string(),
})


const parsed = envSchema.safeParse(process.env);

if (parsed.success === false) {
    const tree = z.treeifyError(parsed.error);
    const invalidKeys = Object.keys(tree.properties ?? {});

    console.error("Invalid env variables:", invalidKeys);

    throw new Error('Missing necessary env keys')
}

export const env: IEnv = parsed.data;