import z from "zod";
import dotenv from 'dotenv'

dotenv.config();

const envSchema = z.object({
    PORT: z.string(),
    NODE_ENV: z.enum(["production", "development"]),
    DB_URL: z.url(),
    BCRYPT_SALT_ROUND: z.string(),
})


const parsed = envSchema.safeParse(process.env);

if (parsed.success === false) {
    const tree = z.treeifyError(parsed.error);
    const invalidKeys = Object.keys(tree.properties ?? {});

    console.error("Invalid env variables:", invalidKeys);

    throw new Error('Missing necessary env keys')
}

export const env = parsed.data;