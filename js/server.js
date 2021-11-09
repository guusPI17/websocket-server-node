import { createServer } from 'http';
import { APP as EXPRESS_APP } from "./express.js";

export const SERVER = createServer(EXPRESS_APP);

SERVER.on('error', (err) => console.error(err));
SERVER.listen(
    process.env.PORT,
    process.env.HOST,
    () => console.log(`server started at ${process.env.HOST}:${process.env.PORT}`)
);