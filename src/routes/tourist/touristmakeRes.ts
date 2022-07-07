import { BookPayment, PrismaClient, Status } from "@prisma/client";
import { Static, Type } from "@sinclair/typebox";
import { ObjectId } from "bson";
import { timeStamp } from "console";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { resWithoutId } from "../reservation/reservation";
import { TouristIdParams } from "./userSchema";
// import { JwtVerificationSchema } from "./tourist-login";

export const JwtVerificationSchema = Type.Object({
	token: Type.String(),
  });
  export type JwtVerificationSchema=Static<typeof JwtVerificationSchema>

 export const CreateReserv=Type.Object({
    date:   Type.String({format:"date-time"}),
    payment:       Type.Enum(BookPayment),
    // created_at:Type.String(timeStamp),
    // tourist_id:Type.String(),
    tourguide_id:Type.String()})
    export type CreateReserv=Static<typeof CreateReserv>
export default async function (server:FastifyInstance) {
    server.route({
        method:'POST',
        url:'/create/reservation',
        schema:{
            summary:'tourist make a reservation',
            tags:['Tourists'],
            body:CreateReserv,
            headers:JwtVerificationSchema
        },
        handler:async(request,reply)=>{
           const makeNewRes=request.body as CreateReserv
           const {token}=request.headers as JwtVerificationSchema
           server.jwt.verify(token,async function name(err,decoded){
               let id=decoded.id;
               if(id){
                   const result= await prismaClient.reservation.create({
                       data:{
                         tourist_id:id,
                        ...makeNewRes

                       }
                   })
               }return
           })
       
        }

        })
        // server.route({
        //     method:'DELETE',
        //     url:'/delete/reservation/:tourist_id',
        //     schema:{
        //         summary:'Deletes a user',
        //         tags:['Tourists'],
        //         params:TouristIdParams,
    
        //     },
        //         handler:async(request,reply)=>{
        //             const {tourist_id}=request.params as TouristIdParams;
        //             if(!ObjectId.isValid(tourist_id)){
        //                 reply.badRequest('invalid id')
        //             return;}
                    
    
        //             return prismaClient.reservation.delete({
        //                 where:{tourist_id}
        //             })
    

                
        // }})
    }
    