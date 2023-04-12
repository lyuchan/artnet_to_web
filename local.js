const http = require('http');
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
let serverip="light.henrywu.tw:3000"

receiver.on('data', function (data) {
    
    let dimmer = data[dimmer_address - 1]
    let r = data[r_address - 1] * (dimmer / 255)
    let g = data[g_address - 1] * (dimmer / 255)
    let b = data[b_address - 1] * (dimmer / 255)
    let shutter = data[shutter_address - 1]
    // console.log(JSON.stringify({ r: r, g: g, b: b }))
   // console.log(r,g,b)
    if (old_r != r || old_g != g || old_b != b || old_s != shutter) {
        send(serverip,r,g,b,shutter)
        //console.log(JSON.stringify({ r: r, g: g, b: b }))
        old_r = r;
        old_g = g;
        old_b = b;
        old_s = shutter;
        
    }

});
function send(ip,r, g, b, s) {
    // 始終檢查引數是否存在，如果不存在，則設置為預設值
    r = r || 0;
    g = g || 0;
    b = b || 0;
    s = s || 0;
  
    // 構建 URL 字串
    const url = `http://${ip}/update?token=password&r=${r}&g=${g}&b=${b}&s=${s}`;
  
    // 發送 HTTP GET 請求
    http.get(url, (res) => {
     // console.log(`已發送請求至：${url}`);
      // 在此處理回應
      // ...
    }).on('error', (err) => {
     // console.error(`請求失敗：${err.message}`);
    });
  }