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
import { LogOut } from "./log-out";
import { FetchDataBy } from "./fetchDataBy";
import { findUserInRisk } from "./Find-userInRisk";
import { GetPacientMetricsState } from "./pacient-state";
import { GetPacientInativeMetrics } from "./get-inative-Agent-metrics";
import { KillPacient } from "./kill-pacient";
import { FetchKilledAgent } from "./fetch-killed-agents";

export async function UserRoutes(app:FastifyInstance)
{
    app.post('/users',Register)
    app.post('/users/sessions',Authenticate)
    app.get('/users/killed/:page=page & query=query',FetchKilledAgent)
    app.post('/killPacient/:userId',KillPacient)
    app.get('/users/fetch/:query=query?',{onRequest:[verifyJWT]},Fetch)
    app.get('/users/inative',GetPacientInativeMetrics)
    app.get('/users/find-user-InRisk',{onRequest:[verifyJWT]},findUserInRisk)
    app.get('/users/me',{onRequest:[verifyJWT]},Profile)
    app.get('/users/state',GetPacientMetricsState)
    app.get('/users/techician/:province=province & unidade=unidade & municipality=municipality & page=page',{onRequest:verifyJWT},techician)
    app.delete('/users/delete/:id',{onRequest:[verifyJWT]},Delete)
    app.get('/users/metrics',GetPacientMetrics)
    app.patch('/users/log-out/:userId',LogOut)
    app.get('/fetchDataBy/:province=province & municipality=municipality & unidade=unidade',{onRequest:[verifyJWT]},FetchDataBy)
    app.get('/users/province/:province=province & municipality=municipality & unidade=unidade &page=page',{onRequest:[verifyJWT]},fetchby)
}