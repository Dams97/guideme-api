import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { resIdParams } from "./reservation";

export default async function (server: FastifyInstance) {
    
    server.route({
        method:'DELETE',
        url:'/delete/:booking_id',
        schema:{
            summary:'Cancel a reservation',
            tags:['Reservation'],
            params:resIdParams,

        },
            handler:async(request,reply)=>{
                const {booking_id}=request.params as resIdParams;
                if(!ObjectId.isValid(booking_id)){
                    reply.badRequest('invalid id')
                return;}
                

                return prismaClient.reservation.delete({
                    where:{booking_id},
                })

            }
          })
}