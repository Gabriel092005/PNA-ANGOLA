import { app } from "./app";
import { env } from "./Env";
import SocketConfig from "./Config/Sockets/index"

app.listen({
    host:'0.0.0.0',  //evitar problema com o consumo no front
    port: env.PORT

}).then(()=> {
    console.log('🚀HTTP Server Running')
    SocketConfig.initialize(app)
}
) 


///o listen retorna uma promisse