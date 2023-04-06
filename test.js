const SerialPort = require('serialport');
const port = new SerialPort('COM8', { baudRate: 115200 });

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 這是一個示例數據陣列，長度為 10

// 計算數據長度
const length = data.length;

// 將數據長度作為一個 32 位整數值發送到 Arduino
const lengthBuffer = Buffer.alloc(4);
lengthBuffer.writeUInt32LE(length);
port.write(lengthBuffer);

// 將數據陣列作為二進制數據發送到 Arduino
const dataBuffer = Buffer.from(data);
port.write(dataBuffer);
