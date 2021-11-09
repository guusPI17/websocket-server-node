import express from 'express';
import path from "path";

export const APP = express();
APP.use(express.static(path.join(process.cwd(), 'public')))

APP.get("/", function(request, response){
    response.sendFile(`${process.cwd()}/public/index.html`);
});