import { generateMessageID } from "../../../utils/generate"
import prisma from "../../../utils/prisma"
import { getDateNow } from "../../../utils/utils"
import { getID } from "../../../utils/verifyToken"
import { CreateMessageInput, EditMessageSchema } from "./msg.schema"

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
      professorId: true,
      userId: true
    }
  })
  if (isFrom?.professorId === senderID || isFrom?.userId === senderID){
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
      createdByUser: true,

    }
  })
  //if true && true true || !false !false 
  if (byUser === isFrom?.createdByUser && ((userOrProfessor && byUser) || (!userOrProfessor && !byUser))){
    return true
  }else return false
}



export async function createMessage(input:CreateMessageInput, header:any):Promise<any>{
  const senderID = await getID(header)
  const { guidanceId , text } = input
  if (await senderIsOnGuidance(senderID, guidanceId) && (text).length > 0){
    const byUser = await byUserTrueOrProfessorFalse(senderID)
    const id = generateMessageID()
    const dateNow = await getDateNow()
    try{
      await prisma.guidance.update({
        where:{
          id: guidanceId
        },
        data:{
          messages:{
            create:{
              id,
              text,
              createdByUser: byUser,
              createdAt: dateNow
            }
          }
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