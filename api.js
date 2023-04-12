const express = require("express");
const app = express();
const SocketServer = require("ws").Server;
const server = app.listen(3000, () => {
	console.log("Application started and Listening on port 3000");
});
const wss = new SocketServer({ server });
let store = {r:0,g:0,b:0,s:0};

app.use(express.static(__dirname + "/web"));
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/web/index.html");
});
app.get('/update', (req, res) => {
	if(req.query.token == 'password') {
		wss.clients.forEach((client) => {
			store = {
				r: req.query.r,
				g: req.query.g,
				b: req.query.b,
				s: req.query.s
			};
			client.send(JSON.stringify({
				r: req.query.r,
				g: req.query.g,
				b: req.query.b,
				s: req.query.s
			}));
		});
		res.send('ok');
	} else res.send('token_err');
});

wss.on("connection", (ws) => {
	ws.send(store);
	ws.on("message", (event) => {
	});
	ws.on("close", () => {
	});
});
