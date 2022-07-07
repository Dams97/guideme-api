//import { BookPayment, Status,Reservation ,Tourist,Tourguide} from "@prisma/client";
import { Static,Type } from "@sinclair/typebox";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import _, { result } from "lodash";
import { timeStamp } from "console";
import { BookPayment, Status, Tourist } from "@prisma/client";
import { JwtVerificationSchema } from "../tourist/touristmakeRes";



 export const Reservation=Type.Object({
    booking_id:     Type.String(),        
    booking_status:  Type.Enum(Status),
    date:   Type.String({format:"date-time"}),
    payment:       Type.Enum(BookPayment),
    created_at:Type.String(timeStamp),
    tourist_id:Type.String(),
    tourguide_id:Type.String()


    });
   export const resWithoutId=Type.Object({ 
    booking_status:  Type.Enum(Status),    
        date:           Type.String({format:"date-time"}),
        created_at:Type.String(timeStamp),
        payment:        Type.Enum(BookPayment),
        //tourist_id:     Type.String(),
        tourguide_id:   Type.String()
    
        })

export type resWithoutId=Static<typeof resWithoutId>
export const resIdParams=Type.Object({
    booking_id:Type.String()
})
export type resIdParams=Static<typeof resIdParams>
export type Reservation=Static<typeof Reservation>




export default async function(server:FastifyInstance){
//     server.route({
//         method: 'PUT',
//         url: '/create',
//         schema: {
//             summary: 'Creates a new reservation+all properties are required',
//             tags: ['Reservation'],
//             body: Reservation,
//         },
//         handler:async(request,reply)=>{
//             const newRes=request.body as any ;
//             if(!ObjectId.isValid(newRes.booking_id)){
//                 reply.badRequest('booking_id should be an ObjectId!')
//             }else
//             return await prismaClient.reservation.upsert({
//                 where:{booking_id:newRes.booking_id},
//                 create:{..._.omit(newRes,['tourist_id'])as any,
//             tourist:{
//                 connect:{tourist_id:newRes.tourist_id}
//             },
          
//         },
//         update:_.omit(newRes,['booking_id']),
        

// })
//         }
//     }),
    server.route({
		method: 'GET',
		url: '/myres/:booking_id',
		schema: {
			summary: 'Returns one booking',
			tags: ['Reservation'],
			params: resIdParams,
			// response: {
			// 	'2xx': Type.Union([Reservation, Type.Null()]),
			// },
		},
		handler: async (request, reply) => {
			const { booking_id } = request.params as resIdParams;
			if (!ObjectId.isValid(booking_id)) {
				reply.badRequest('booking_id should be an ObjectId!');
				return;
			}

			return prismaClient.reservation.findFirst({
				where: { booking_id },
			});
		},
	}),
    server.route({
        method:'GET',
        url:'/view',
        schema:{
            summary:'view all Reservations',
            tags:['Reservation'],
            //  response:{
            //      '2xx':Type.Union([Tourist,Type.Null()])
            },
       
            handler:async(request,reply)=>{
            
                return await prismaClient.reservation.findMany();  
            
            }})
            server.route({
                method: 'POST',
                url: '/create/res',
                schema: {
                    summary: 'Creates a new reservation+all properties are required',
                    tags: ['Reservation'],
                    body: Type.Partial(resWithoutId),
                    headers:JwtVerificationSchema,

                },
                handler:async(request,reply)=>{
                    const newRes=request.body as resWithoutId ;
                    const {token}=request.headers as JwtVerificationSchema
                        server.jwt.verify(token,async function (err,decoded){
                            let id=decoded.id;
                            if(id){
                                return await prismaClient.reservation.create({
                                    data:{
                                      tourist_id:id,
                                     ...newRes
             
                                    }
                                    
                                })
                            }
                        })
                    
                     }
                    })}
                      