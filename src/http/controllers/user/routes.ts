import { FastifyInstance } from "fastify";
import { Register } from "./Register";
import { Authenticate } from "./Authenticate";
import { Fetch } from "./fetch-users";
import { Profile } from "./profile";
import { verifyJWT } from "../middleware/verify-jwt";
import { Delete } from "./delete";
import { techician } from "./fetch-technician";
import { GetPacientMetrics } from "./pacient-metrics";
import { fetchby } from "./fetchusersFilters";

export async function UserRoutes(app:FastifyInstance){
    app.post('/users',Register)
    app.post('/users/sessions',Authenticate)
    app.get('/users/fetch/:query=query',Fetch)
    app.get('/users/me',Profile)
    app.get('/users/techician/:role',techician)
    app.delete('/users/delete/:id',Delete)
    app.get('/users/metrics',GetPacientMetrics)
    app.get('/users/province/:province=province & municipality=municipality & unidade=unidade &page=page',fetchby)
}