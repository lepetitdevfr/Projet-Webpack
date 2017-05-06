var ui = (function ui() {
	"use strict";
	window.onload = function start() {
		console.log("ready to rock");
		const req = new XMLHttpRequest();

		req.onreadystatechange = function(event) {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status === 200) {
					var res = JSON.parse(this.responseText);
					console.log(res);

				} else {
					console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
				}
			}
		};

		req.open('GET', 'http://localhost:8080/articles', true);
		req.send(null);
	};
}());
