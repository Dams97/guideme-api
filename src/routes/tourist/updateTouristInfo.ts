import { Type } from "@sinclair/typebox";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import _ from "lodash";
import { prismaClient } from "../../prisma";
import { Reservation, resWithoutId } from "../reservation/reservation";
//import { touristWithId , TouristIdParams, touristInfo,createTourist} from "./userSchema";
import { PartialtouristWithoutId, TouristIdParams, touristtWithoutId } from "./userSchema";
import { addAuthorization } from "../../hooks/auth";
	
export default async function(server:FastifyInstance){
	// addAuthorization(server);
    server.route({
		method: 'PATCH',
		url: '/:tourist_id',
		schema: {
			summary: 'Update a tourist by id + you dont need to pass all properties',
			tags: ['Tourists'],
			body: PartialtouristWithoutId,
			params: TouristIdParams
          
		},
		handler: async (request, reply) => {
			const { tourist_id } = request.params as TouristIdParams;
			if (!ObjectId.isValid(tourist_id)) {
				reply.badRequest('tourist_id should be an ObjectId!');
				return;
			}
			const touristUpdate = request.body as touristtWithoutId;

			return prismaClient.tourist.update({
				where: { tourist_id },
				data: touristUpdate,
			});
		},
	})
	// server.route({
	// 	method: 'GET',
	// 	url: '/:tourist_id',
	// 	schema: {
	// 		summary: 'Returns one tourist or null',
	// 		tags: ['Tourists'],
	// 		params: TouristIdParams,
	// 		response: {
	// 			'2xx': Type.Union([touristtWithoutId, Type.Null()]),
	// 		},
	// 	},
	// 	handler: async (request, reply) => {
	// 		const { tourist_id } = request.params as TouristIdParams;
	// 		if (!ObjectId.isValid(tourist_id)) {
	// 			reply.badRequest('tourist_id should be an ObjectId!');
	// 			return;
	// 		}

	// 		return prismaClient.tourist.findFirst({
	// 			where: { tourist_id },
                
	// 		});}})
                
            
    
            // Tourgui
//     server.route({
//         method: 'POST',
//         url: '/create/reser',
//         schema: {
//             summary: 'Creates a new reservation+all properties are required',
//             tags: ['Reservation'],
//             body: resWithoutId,
//         },
//         handler:async(request,reply)=>{
//             const newRes=request.body as resWithoutId ;
//             if(!ObjectId.isValid(newRes.tourist_id)){
//                 reply.badRequest('object_id should be an ObjectId!')
//             }else
//             return await prismaClient.tourist.create({
//                 data:{..._.omit(newRes,['tourist_id'])as any,
//                 // create:{..._.omit(newRes,['booking_id'])as any,
//                 Reservation:{
//                 connect:{booking_id:newRes.tourist_id}
//             },
//         },
//         // update:_.omit(newRes,['booking_id']),

// })
//         }
//     })
//     server.route({
//         method: 'POST',
//         url: '/create/res',
//         schema: {
//             summary: 'Creates a new reservation+all properties are required',
//             tags: ['Reservation'],
//             body: resWithoutId,
//         },
//         handler:async(request,reply)=>{
//             const newRes=request.body as any ;
//             return await prismaClient.reservation.create({
//                 data:{..._.omit(newRes,['tourist_id'])as any,
//             Tourist:{
//                 connect:{tourist_id:newRes.tourist_id}
//             },
//         },
//         // update:_.omit(newRes,['booking_id']),

// })
//         }
//     })
}
            
