const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('Novo cliente conectado');

  socket.on('joinRoom', room => {
    socket.join(room);
    socket.room = room;
    console.log(`Cliente entrou na sala: ${room}`);
  });

  socket.on('chatMessage', msg => {
    if (socket.room) {
      io.to(socket.room).emit('chatMessage', msg);
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
