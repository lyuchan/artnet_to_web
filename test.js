const WebSocket = require('ws');
const socket = new WebSocket('ws://light.henrywu.tw:3000');

let r = 0;
let g = 0;
let b = 255;
let k = 0;
socket.on('open', () => {
	setInterval(function() {
		
		if(k==0) {
			b--;
			r++;
			if(r >= 255) k = 1;
		}
		else if(k==1) {
			r--;
			g++;
			if(g >= 255) k = 2;
		}
		else if(k==2) {
			g--;
			b++;
			if(b >= 255) k = 0;
		}
		console.log(r,g,b,k);
		socket.send(JSON.stringify({ t: "password", r: r, g: g, b: b, s: shutter }));
	},100);
});
socket.on('message', (message) => {
});

socket.on('close', () => {
});
