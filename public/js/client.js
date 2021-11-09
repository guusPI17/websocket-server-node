const HOST = "95.46.114.242";
const PORT = 80;
const METHOD = 'websocket';

let responseElem = $('#response');
let socket = new WebSocket(`ws://${HOST}:${PORT}/${METHOD}`);
socket.onopen = () => console.log('Connected'); //|| setInterval(() => socket.send(new Date().toLocaleString()), 1000);
socket.onclose = (event) => console.log((event.wasClean) ? 'Disconnected' :  'Connection break: ' + (event.reason || event.code));
socket.onmessage = (event) => {
    responseElem.text(event.data);
    console.log('Message: %s', event.data);
};
socket.onerror = (err) => console.error(err.message);

//дожидаемся полной загрузки страницы
window.onload = function () {
    $('#sendMessage').on('click', () => {
        socket.send(JSON.stringify({action: 'ECHO', data: $('#message').val().toString()}));
        return false;
    })
}