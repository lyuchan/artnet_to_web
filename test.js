const WebSocket = require('ws');

// 創建 WebSocket 伺服器，監聽在 127.0.0.1:8081
const server = new WebSocket.Server({ port: 8080 });

// 監聽連接事件
server.on('connection', (socket) => {
    console.log('已建立連接');

    // 監聽從客戶端接收到的資料
    socket.on('message', (data) => {
        console.log(`接收到資料: ${data}`);

        // 將接收到的資料轉發給 127.0.0.1:8080
        const client = new WebSocket('ws://127.0.0.1:8081');
        client.on('open', () => {
            client.send(data);
            console.log(`資料已轉發至 127.0.0.1:8080: ${data}`);
            client.close();
        });
    });

    // 監聽關閉事件
    socket.on('close', () => {
        console.log('連接已關閉');
    });

    // 監聽錯誤事件
    socket.on('error', (error) => {
        console.error(`連接錯誤: ${error.message}`);
    });
});
