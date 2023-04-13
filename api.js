const express = require("express");
const app = express();
const SocketServer = require("ws").Server;
const server = app.listen(3000, () => {
	console.log("Application started and Listening on port 3000");
});
const wss = new SocketServer({ server: server, path: 'ws'});
let store = { r: 0, g: 0, b: 0, s: 0, m: '' };

app.use(express.static(__dirname + "/web"));
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/web/index.html");
});
app.get("/message", (req, res) => {
	if(req.query.token == 'password') {
		store.m = req.query.m;
		send(JSON.stringify({m:req.query.m}));
		res.send('ok');
	} else res.send('err');
});

wss.on("connection", (ws) => {
	ws.send(JSON.stringify(store));
	ws.on("message", (event) => {
		let data = JSON.parse(event)
		if (data.t = "password") {
			delete data.t;
			data.m = store.m;
			send(JSON.stringify(data));
			store = data;
		}

	});
	ws.on("close", () => {
	});
});
function send(data) {
	let clients = wss.clients;
	clients.forEach((client) => {
		let sendData = data
		client.send(sendData);//回去的資料
	});
}
