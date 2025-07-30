/* eslint-disable no-console */
import app from "./app";
import { env } from "./app/config/env";
import mongoose from "mongoose";
import { Server } from 'http'

let server: Server

const startServer = async () => {
    try {
        await mongoose.connect(env.DB_URL);
        console.log('Mongodb is working perfectly.');

        server = app.listen(env?.PORT, () => {
            console.log(`Server is running on port ${env?.PORT}`);
        })

    } catch (error) {
        console.log(error);
    }
}

startServer()


process.on("SIGINT", () => {
    console.log("SIGINT signal received. Server is shutting down.");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    } else {
        process.exit(1)
    }
})
process.on("SIGTERM", () => {
    console.log("SIGTERM signal received. Server is shutting down.");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    } else {
        process.exit(1)
    }
})

process.on("unhandledRejection", () => {
    console.log("An unhandled rejection detected. Server is shutting down.");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    } else {
        process.exit(1)
    }
})

process.on("uncaughtException", () => {
    console.log("An uncaught exception detected. Server is shutting down.");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    } else {
        process.exit(1)
    }
})