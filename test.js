const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:3000');

let r = 0;
let g = 0;
let b = 255;
let k = 0;
socket.on('open', () => {
	setInterval(function() {
		
		if(k==0) {
			b-=4;
			r+=4;
			if(r >= 255) k = 1;
		}
		else if(k==1) {
			r-=4;
			g+=4;
			if(g >= 255) k = 2;
		}
		else if(k==2) {
			g-=4;
			b+=4;
			if(b >= 255) k = 0;
		}
		//console.log(r,g,b,k);
		socket.send(JSON.stringify({ t: "password", r: r, g: g, b: b, s: 0, bpm: 180 }));
	},100);
});
socket.on('message', (message) => {
});

socket.on('close', () => {
});
