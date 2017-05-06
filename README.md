### Installation

Requires [Node.js](https://nodejs.org/) v4+ to run.

Clone the repository

```sh
$ git clone https://github.com/lepetitdevfr/Projet-webpack.git
```

Install the dependencies and devDependencies.

```sh
$ cd Projet-webpack
$ npm install
```

Edit server.js and set your mail and MySql informations
```js
	// MySql informations
	var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'blog'
    });
    
	// Mail informations
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'YourGmailAddress',
			pass: 'yourPassword'
		}
	});
```
Start the server.
```sh
$ node server.js
```

Build the application.

```sh
$ npm run dev
```
