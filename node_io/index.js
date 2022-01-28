import express from "express";
import dateFormat, { masks } from "dateformat";
import {createServer} from "http";
import { Server } from "socket.io";
import cors from 'cors';



var app = express();
app.use(cors()); 

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
      }
});

app.set("view engine", 'ejs');

app.get("/", (req, res) => {
    res.render('index');
})

io.on("connection", (socket) => {
    
    socket.on("disconnect", () => {
        console.log("X desconectou: " + socket.id);
    });

    socket.on("client_id", () => {
        console.log('cliente id');
        io.emit("server_id",  socket.id); //io é o servidor, socket é o show msg
    });

    socket.on("msg", (data) => {
        // socket.broadcast.emit() 
        data['msg_id'] = socket.id;
        data['msg_session_id'] = data.session_id;
        var now = dateFormat( new Date(), "isoDateTime");
        data['ts'] = now;
        io.emit("show_msg", data); //io é o servidor, socket é o show msg
    });

});


httpServer.listen(3000, () => {
    console.log('app rodando');
})