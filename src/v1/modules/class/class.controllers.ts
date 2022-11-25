import { FastifyRequest, FastifyReply } from 'fastify';
import { createClass, getClasses, getProfessorsByClassId, getUsersByClassId } from './class.service';
import { CreateClassInput, GetClassProfessorInput, GetClassUsersInput } from './class.schema';
import errorHandler from '../../../utils/errorHandle';
import replyHandler from '../../../utils/replyHandler';


export async function registerClassHandler(request: FastifyRequest<{Body : CreateClassInput}>,reply: FastifyReply){
  const body = request.body
  const newClass = await createClass(body);
  return replyHandler(newClass, "new Class", 201, reply)
  
}


export async function getClassesHandler(){
  try{
    return getClasses()
  }catch(e){
    return (e)
  }
}


export async function getUsersByClassIdHandler(request: FastifyRequest<{Querystring: GetClassUsersInput}>,reply: FastifyReply,){
  console.log("Getting users from class " + request.query.classId)
  const query = request.query
  try{
    const users = await getUsersByClassId(query)
    console.log("Get users successfully")
    return users[0]
  }catch(e){
    return errorHandler(e, "error getting users by classId", reply)
  }
}

export async function getProfessorsByClassIdHandler(
  request: FastifyRequest<{Querystring: GetClassProfessorInput}>,
  reply: FastifyReply
){
  console.log("Getting professors from class " + request.query.classId)
  const query = request.query
  try{
    const professors = await getProfessorsByClassId(query)
    console.log("Get professors successfully")
    return professors[0]
  }catch(e){
    return errorHandler(e, "error getting users by classId", reply)
  }
}