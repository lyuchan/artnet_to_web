const express = require("express");
const app = express();
const SocketServer = require("ws").Server;
const server = app.listen(8080, () => {
	console.log("Application started and Listening on port 8080");
});
const wss = new SocketServer({ server });

app.use(express.static(__dirname + "/web"));
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/web/index.html");
});
app.get('/update', (req, res) => {
	if(req.query.token == 'password') {
		wss.clients.forEach((client) => {
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
	ws.on("message", (event) => {
	});
	ws.on("close", () => {
	});
});