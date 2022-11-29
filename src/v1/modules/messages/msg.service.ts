import { generateMessageID } from "../../../utils/generate"
import prisma from "../../../utils/prisma"
import { getDateNow } from "../../../utils/utils"
import { getID } from "../../../utils/verifyToken"
import { CreateMessageInput, EditMessageSchema, CreateGuidanceCoreInput } from './msg.schema';

async function byUserTrueOrProfessorFalse(senderID: string):Promise<boolean>{
  if ((senderID).length == 12){
    return true
  }else {
    return false
  }
}

async function senderIsOnGuidance(senderID: string, guidanceId: string):Promise<boolean>{
  const isFrom = await prisma.guidance.findUnique({
    where:{
      id: guidanceId
    },
    select:{
      teacherId: true,
      studentId: true
    }
  })
  if (isFrom?.teacherId === senderID || isFrom?.studentId === senderID){
    return true
  }else return false
}
//verify if the given byUser is the same from the message ( true | false ) and verify if the sender is User or Professor ( true | false ) 
async function canEditMessage(senderID: string, messageId: string, byUser: boolean):Promise<boolean>{
  const userOrProfessor = await byUserTrueOrProfessorFalse(senderID)
  const isFrom = await prisma.message.findUnique({
    where:{
      id: messageId,
    },
    select:{
      createdByStudent: true,
    }
  })
  //if true && (true true || !false !false)
  if (byUser === isFrom?.createdByStudent && ((userOrProfessor && byUser) || (!userOrProfessor && !byUser))){
    return true
  }else return false
}

export async function createMessage(input:CreateMessageInput, header:any):Promise<any>{
  const senderID:any = await getID(header)
  const { guidanceId , text } = input
  if (await senderIsOnGuidance(senderID, guidanceId) && (text).length > 0){
    const byUser = await byUserTrueOrProfessorFalse(senderID)
    const id = generateMessageID()
    const dateNow = await getDateNow()
    try{
      await prisma.message.create({
        data:{
          id: id,
          text,
          createdAt: dateNow,
          createdByStudent: byUser,
          guidance:{
            connect:{
              id: guidanceId,
            }
          },
        }
      })
      return true;
    }catch(e){
      return e;
    }
  }else{
    return(
      {"data":{
        "error": "something went wrong",
        "message":"Or the text is empty or you aren't on this guidance"
      }
    })
  }
}

export async function editMessage(input: EditMessageSchema, header :any){
  const senderID = await getID(header)
  const { guidanceId, text, messageId, byUser } = input
  if (!(await senderIsOnGuidance(senderID, guidanceId))){
    return ({
      "data":{
        "error": "Not Allowed",
        "message": "Only the professor and user can edit messages on this Guidance!"
      }
    })
  }
  if (! await canEditMessage(senderID, messageId, byUser)){
    return({
      "data":{
        "error": "You aren't the owner",
        "message": "You can't edit others messages!"
      }
    })
  }else{
    await prisma.message.update({
      where:{
        id: messageId,
      },
      data:{
        text
      }
    })
    console.log("edited")
    return true
  }
}

export async function getMessages(input: CreateGuidanceCoreInput, headers:any):Promise<any>{
  const id = await getID(headers)
  const guidanceId = input.guidanceId
  const isOn = await senderIsOnGuidance(id, guidanceId)
  if (isOn){
    const messages = await prisma.message.findMany({
      where:{
        guidanceId : guidanceId
      }
    })
    return({"data": {"messages": messages}})
  }else{
    return({"data": {"error": "Your Id or guidanceId was not found"}})
  }
}