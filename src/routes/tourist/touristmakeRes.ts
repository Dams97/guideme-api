import { BookPayment, PrismaClient, Status } from "@prisma/client";
import { Static, Type } from "@sinclair/typebox";

import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";

// import { JwtVerificationSchema } from "./tourist-login";

export const JwtVerificationSchema = Type.Object({
	token: Type.String(),
  });
  export type JwtVerificationSchema=Static<typeof JwtVerificationSchema>

 export const CreateReserv=Type.Object({
    date:Type.String({format:"date-time"}),
    payment:       Type.Enum(BookPayment),
    tourguide_id:Type.String()})
    export type CreateReserv=Static<typeof CreateReserv>
export default async function (server:FastifyInstance) {
    server.route({
        method:'POST',
        url:'/create/reservation',
        schema:{
            summary:'tourist make a reservation',
            tags:['Tourists'],
            body:Type.Partial(CreateReserv),
            headers:JwtVerificationSchema
        },
        handler:async(request,reply)=>{
           const makeNewRes=request.body as CreateReserv
           const {token}=request.headers as JwtVerificationSchema
           server.jwt.verify(token,async function(err,decoded){
               let a=decoded.id;
               if(a){
                  return await prismaClient.reservation.create({
                       data:{
                           date:makeNewRes.date,
                           payment:makeNewRes.payment,
                           tourguide_id:makeNewRes.tourguide_id,
                           tourist_id:a,
                        // ...makeNewRes
                       }
                   })
               }
               return await prismaClient.reservation.findMany();

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
    