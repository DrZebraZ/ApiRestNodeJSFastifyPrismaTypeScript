import jwtDecode from "jwt-decode";
import prisma from "../../../utils/prisma";
import { CreateTccInput } from "./tcc.schema";
import { generateTccID, generateOrientationID } from '../../../utils/generate';
import { getToken } from "../../../utils/verifyToken";

export async function createTCC(input: CreateTccInput, header:any):Promise<any>{
  const token = await getToken(header)
  const { title, summary } = input
  if (!title){
    return "missing title"
  }
  else if (!summary){
    return "missing summary"
  }
  const user = await prisma.user.findUnique({
    where:{
      token
    }
  })
  console.log(user)
  if (user){
    try{
      const idTcc = generateTccID()
      const idOrientacao = generateOrientationID()
      await prisma.tcc.create({
        data:{
          id: idTcc,
          summary,
          title,
          classId: user.classId,
          userId:user.id,
        }
      })
      await prisma.orientation.create({
        data:{
          id: idOrientacao,
          tccId: idTcc,
          userId: user.id,
        }
      })
      return (true)
    }catch(e){
      return e
    }
  }else{
    return (false)
  }

}