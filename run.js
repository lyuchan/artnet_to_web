const express = require("express");
var dmxlib = require('dmxnet');
var dmxnet = new dmxlib.dmxnet({});
var receiver = dmxnet.newReceiver({
    subnet: 0,
    universe: 1,
    net: 0,
});

const app = express();
const SocketServer = require("ws").Server;
const server = app.listen(8080, () => {
    console.log("Application started and Listening on port 8080");
});
app.use(express.static(__dirname + "/web"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/web/index.html");
});

const wss = new SocketServer({ server });
wss.on("connection", (ws) => {
    ws.on("message", (event) => {
    });
    ws.on("close", () => {
    });
});
receiver.on('data', function (data) {
    //console.log(data)
    send(JSON.stringify({ data: data }))
});
function send(data) {
    let clients = wss.clients;
    clients.forEach((client) => {
        let sendData = data
        client.send(sendData);
    });
}