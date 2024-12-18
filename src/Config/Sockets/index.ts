import { FastifyInstance } from "fastify/types/instance"
import { Server as SocketIoServer, Socket } from "socket.io"


class SocketConfig {

    private io: SocketIoServer | undefined
    public _socket: Socket | undefined

    initialize(server: FastifyInstance) {
        this.io = new SocketIoServer(server.server)  

        this.io.on("connection", (socket) => {
            console.log("Novo cliente conectado: ", socket.id)

            this._socket = socket

            socket.on('disconnect', () => { console.log('Cliente desconecado.'); });
        })
    }

}

export default new SocketConfig()