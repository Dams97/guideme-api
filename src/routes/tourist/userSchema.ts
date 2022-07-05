import { prismaClient } from '../../prisma';
import { Static,Type } from "@sinclair/typebox";
import { Tourist } from '@prisma/client';
import { FastifyInstance } from "fastify";
import { ObjectId } from "bson";
import _ from 'lodash';
import { Reservation,resWithoutId } from '../reservation/reservation';
import { CreateReserv } from './touristmakeRes';



 const Tourist=Type.Object({
    tourist_id:Type.String(),
    email:    Type.String() ,   
    name  :    Type.String(),   
    password:  Type.String() ,  
    phone:     Type.String() ,
    country:   Type.String() ,
   //reservations:Type.Optional(Type.Array(Type.Optional(Reservation)))
})
export const touristtWithoutId=Type.Object({
    email:    Type.String() ,   
    name  :    Type.String(),   
    password:  Type.String() ,  
    phone:     Type.String() ,
    country:   Type.String() ,
    // reservations:Type.Optional(Type.Array(Reservation))
})


export const PartialtouristWithoutId = Type.Partial(touristtWithoutId);
export type PartialtouristWithoutId = Static<typeof PartialtouristWithoutId >;
//export type Tourist=Static<typeof Tourist>
export type touristtWithoutId=Static<typeof touristtWithoutId>
export const TouristIdParams=Type.Object({
    tourist_id:Type.String()
})
export type TouristIdParams=Static<typeof TouristIdParams>

export default async function (server: FastifyInstance) {
    server.route({
        method: 'PUT',
        url: '/create',
        schema: {
            summary: 'Creates or update Tourist',
            tags: ['Tourists'],
            body:Type.Partial(Tourist),
        },
        handler:async(request,reply)=>{		
            const newTourist = request.body as Tourist;
			if (!ObjectId.isValid(newTourist.tourist_id)) {
				reply.badRequest('tourist_id should be an ObjectId!');
			} else {
				return await prismaClient.tourist.upsert({
					where: { tourist_id: newTourist.tourist_id },
					create: newTourist,
					update: _.omit(newTourist, ['tourist_id']),
				});
			}
		},
	});

    // server.route({
	// 	method: 'POST',
	// 	url: '/create',
	// 	schema: {
	// 		summary: 'Creates new tourist',
	// 		tags: ['Tourists'],
	// 		body:touristtWithoutId,
	// 	},
	// 	handler: async (request, reply) => {
	// 		const tourist = request.body as touristtWithoutId;
	// 		return await prismaClient.tourist.create({
	// 			data:tourist
	// 		});
	// 	},
	// }),
    server.route({
		method: 'GET',
		url: '/:tourist_id',
		schema: {
			summary: 'Returns one tourist or null',
			tags: ['Tourists'],
			params: TouristIdParams,
			response: {
				'2xx': Type.Union([Tourist, Type.Null()]),
			},
		},
		handler: async (request, reply) => {
			const { tourist_id } = request.params as TouristIdParams;
			if (!ObjectId.isValid(tourist_id)) {
				reply.badRequest('tourist_id should be an ObjectId!');
				return;
			}

			return prismaClient.tourist.findFirst({
				where: { tourist_id },
                
			});
                
            }
          }),
          server.route({
            method:'GET',
            url:'/',
            schema:{
                summary:'view all tourists',
                tags:['Tourists'],
                //  response:{
                //      '2xx':Type.Union([Tourist,Type.Null()])
                },
           
                handler:async(request,reply)=>{
                
                    return await prismaClient.tourist.findMany();  
                    
                }})


}

                
            


// export const { schemas: userSchemas, $ref } = buildJsonSchemas({
//   createTourist,
//   touristWithId,
//   loginSchema,
//   loginResponseSchema,
// });
// export let users:User[]=[
//     {tourist_id:new ObjectId().toHexString(),name:'Tahani',email:'t@test',phone:'987654',country:'Saudi Arabia'},
//     {tourist_id:new ObjectId().toHexString(),name:'Tani',email:'tuuu@test',phone:'987654',country:'Saudi Arabia'}
// ]
// function allExceptId(object:any,idName:string){
//     const newObject:any={}
//     for(const key in object){
//         if(key===idName)
//         newObject[key]=object[key]
//     }return object;
// }

//type User=Static<typeof User>
// export default async function (server: FastifyInstance) {
// server.route({
//     method: 'PUT',
//     url: '/create',
//     schema: {
//         summary: 'Creates new Tourist',
//         tags: ['Tourist'],
//         body:createTourist,
//     },
//     handler:async(request,reply)=>{
//         const checkUser=request.body as createTourist;
//         return await prismaClient.tourist.upsert({
//             where:{tourist_id:ch}
//             create:touristWithId,
//             update:_.omit(checkUser,['tourist_id']),
//         })
//     }
// }),
// server.route({
//     method: 'PATCH',
//     url: '/user/:tourist_id',
//     schema: {
//         summary: 'Update a contact by id + you dont need to pass all properties',
//         tags: ['Tourist'],
//         body: Type.Partial(touristtWithoutId),
//         params:TouristIdParams
//     },
//     handler: async (request, reply) => {
//         const { tourist_id } = request.params as TouristIdParams;
//         if (!ObjectId.isValid(tourist_id)) {
//             reply.badRequest('contact_id should be an ObjectId!');
//             return;
//         }

//         const userUpdate = request.body as UsertWithoutId 
//         return prismaClient.user.update({
//             where: { tourist_id },
//             data:userUpdate,
//         })
//     }
// }),
        
    

       
        //   server.route({
        //     method:'DELETE',
        //     url:'/users/:tourist_id',
        //     schema:{
        //         summary:'Deletes a user',
        //         tags:['Tourist'],
        //         params:TouristIdParams,
    
        //     },
        //         handler:async(request,reply)=>{
        //             const {tourist_id}=request.params as TouristIdParams;
        //             if(!ObjectId.isValid(tourist_id)){
        //                 reply.badRequest('invalid id')
        //             return;}
                    
  
        //             return prismaClient.user.delete({
        //                 where:{tourist_id},
        //             })
    
        //         }
        //       }),
            //   server.route({
            //             method:'GET',
            //             url:'/users/:tourist_id',
            //             schema:{
            //                 summary:'view one user or null',
            //                 tags:['Tourist'],
            //                 params:TouristIdParams,
            //                 response:{
            //                     '2xx':Type.Union([User,Type.Null()])
            //                 }
                
            //                 },
            //                 handler:async(request,reply)=>{
            //                     const {tourist_id}=request.params as TouristIdParams;
            //                     if(!ObjectId.isValid(tourist_id)){
            //                         reply.badRequest('invalid id')
            //                     return;}
            //                     return prismaClient.user.findFirst({
            //                         where:{tourist_id},
            //                     })
                                
            //                 }
            //               }),
            //               server.route({
            //                 method:'GET',
            //                 url:'/',
            //                 schema:{
            //                     summary:'view all tour users',
            //                     tags:['Tourist'],
            //                     // response:{
            //                     //      '2xx':Type.Union([TourGuide,Type.Null()])
            //                     // },
            //                 },
            //                     handler:async(request,reply)=>{
                                
            //                         return await prismaClient.user.findMany();  
                                    
            //                     }})
            //                 }
                          
                        

// export default async function (server:FastifyInstance) {

//     server.route({
//         method:'PUT',
//         url:'/user/create',
//         schema:{
//             summary:'create a new user',
//             tags:['Tourist'],
//             body:Tourist
//         },
//         handler: async (request, reply) => {
// 			return upsertTouristController(tourist,request.body);
// 		}
//     })
//     server.route({
//         method: 'PATCH',
// 		url: '/user/update/:id',
// 		schema: {
// 			summary: 'Update a user by id + you dont need to pass all properties',
// 			tags: ['Tourist'],
// 			body: Type.Partial(Tourist),
// 			params: Type.Object({
// 				id: Type.String({ format: 'uuid' }),
// 			}),
// 		},
// 		handler: async (request, reply) => {
// 			return upsertTouristController(tourist, request.body);
// 		},
// 	}),
//     server.route({
//         method:'GET',
//         url:'/users/:id',
//         schema:{
//             summary:'view user info',
//             tags:['Tourist'],
//             params:Type.Object({
//                 id:Type.String({format:'uuid'}),

//             }),
//             },
//             handler:async(request,reply)=>{
                
//                 const touristInfo=tourist.find((elm)=>elm.id===(request.params as any).id as string);
//                 return touristInfo;

//             }
//           }),
//           server.route({
//             method:'DELETE',
//             url:'/users/:id',
//             schema:{
//                 summary:'Delete the user',
//                 tags:['Tourist'],
//                 params:Type.Object({
//                     id:Type.String({format:'uuid'}),
    
//                 }),
//                 },
//                 handler:async(request,reply)=>{
                    
  
//                     return tourist.filter((elm)=>elm.id!==(request.params as any).id as string);;
    
//                 }
//               })

//         }
