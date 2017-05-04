'use strict';
var app = require('express')(),
server = require('http').createServer(app),
io = require('socket.io').listen(server)
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

io.sockets.on('connection', function (socket) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jerem71100@gmail.com',
            pass: 'pomme19951208'
        }
    });

    socket.on('sendMail', function(data) {
        var mailOptions = {
            from: '"Fred Foo 👻" <foo@blurdybloop.com>',
            to: 'jerem71100@gmail.com',
            subject: 'Hello ✔',
            text: 'Hello world ?',
            html: '<b>Hello world ?</b>'
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
                socket.emit("sendMailCallback", {code:500,data:error});

            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            socket.emit("sendMailCallback", {code:200,data:info});
        });

    });
});

server.listen(8181,function () {
    console.log('Server listening on 8181...')
});



