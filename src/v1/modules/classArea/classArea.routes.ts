import { FastifyInstance} from "fastify";
import { registerClassAreaHandler } from "./classArea.controllers";


async function classAreaRoutesV1(server: FastifyInstance){

  server.post('/create', registerClassAreaHandler);

}
export default classAreaRoutesV1