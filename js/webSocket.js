import { WebSocketServer } from 'ws';
import { SERVER as HTTP_SERVER } from './server.js';

export const WSS = new WebSocketServer({
    server: HTTP_SERVER,
    path: '/websocket'
});

WSS.on('connection', ws => {
    startConnection(ws);
    ws.on('pong', wsPong.bind(this, ws));
    ws.on('message', wsMessage);
    ws.on('close', wsClose);
});

function startConnection(ws) {
    console.log('Новый пользователь');
    ws.isAlive = true;
}

function wsPong(ws) {
    ws.isAlive = true;
}

function wsMessage(data) {
    try {
        const jsonMessage = JSON.parse(data);
        console.log(jsonMessage);
        switch (jsonMessage.action) {
            case 'ECHO':
                WSS.clients.forEach(client => client.send(jsonMessage.data));
                break;
            default:
                console.log('Неизвестная команда');
                break;
        }
    } catch (error) {
        console.log('Ошибка', error);
    }
}

function wsClose() {
    console.log('Пользователь отключился');
}

setInterval(() => {
    WSS.clients.forEach(ws => {
        if (!ws.isAlive) {
            return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping();
    });
}, 10000);