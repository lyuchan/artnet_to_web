const express = require("express");
var dmxlib = require('dmxnet');
var dmxnet = new dmxlib.dmxnet({});
var receiver = dmxnet.newReceiver({
    subnet: 0,
    universe: 1,
    net: 0,
});
let dimmer_address = 1
let r_address = 2
let g_address = 3
let b_address = 4
let shutter_address = 5
let old_r = 0
let old_g = 0
let old_b = 0
let old_s = 0
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
    let dimmer = data[dimmer_address - 1]
    let r = data[r_address - 1] * (dimmer / 255)
    let g = data[g_address - 1] * (dimmer / 255)
    let b = data[b_address - 1] * (dimmer / 255)
    let shutter = data[shutter_address - 1]
    // console.log(JSON.stringify({ r: r, g: g, b: b }))

    if (old_r != r || old_g != g || old_b != b || old_s != shutter) {
        send(JSON.stringify({ r: r, g: g, b: b, s: shutter }))
        //console.log(JSON.stringify({ r: r, g: g, b: b }))
        old_r = r;
        old_g = g;
        old_b = b;
        old_s = shutter;
    }

});
function send(data) {
    let clients = wss.clients;
    clients.forEach((client) => {
        let sendData = data
        client.send(sendData);
    });
}