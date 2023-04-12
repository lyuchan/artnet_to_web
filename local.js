const WebSocket = require('ws');
const socket = new WebSocket('ws://light.henrywu.tw:3000');
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
socket.on('open', () => {
    console.log('已连接到WebSocket服务器');

    // 向服务器发送消息


    receiver.on('data', function (data) {

        let dimmer = data[dimmer_address - 1]
        let r = data[r_address - 1] * (dimmer / 255)
        let g = data[g_address - 1] * (dimmer / 255)
        let b = data[b_address - 1] * (dimmer / 255)
        let shutter = data[shutter_address - 1]
        // console.log(JSON.stringify({ r: r, g: g, b: b }))

        if (old_r != r || old_g != g || old_b != b || old_s != shutter) {
            socket.send(JSON.stringify({ t: "password", r: r, g: g, b: b, s: shutter }));
            // console.log(JSON.stringify({ r: r, g: g, b: b }))
            old_r = r;
            old_g = g;
            old_b = b;
            old_s = shutter;

        }

    });
});
socket.on('message', (message) => {
    //console.log(`接收到服务器消息：${message}`);
});

// 监听关闭事件
socket.on('close', () => {
    console.log('已关闭WebSocket连接');
});

