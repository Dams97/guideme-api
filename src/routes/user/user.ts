import { prismaClient } from '../../prisma';
import { Static,Type } from "@sinclair/typebox";
import { User } from '@prisma/client';
import { FastifyInstance } from "fastify";
import { ObjectId } from "bson";
import { request } from 'http';
import { upsertTouristController } from '../../controllers/userController';
//import { upsertTouristController } from "../controllers/upsert-tourist";



const User=Type.Object({

  user_id :Type.String(),   
  name    :Type.String(),     
  email   : Type.String(),    
  phone   :  Type.String(),  
  country : Type.String()
  
});
export let users:User[]=[
    {user_id:new ObjectId().toHexString(),name:'Tahani',email:'t@test',phone:'987654',country:'Saudi Arabia'},
    {user_id:new ObjectId().toHexString(),name:'Tani',email:'tuuu@test',phone:'987654',country:'Saudi Arabia'}
]
//type User=Static<typeof User>
export default async function (server: FastifyInstance) {
server.route({
    method: 'PUT',
    url: '/user/create',
    schema: {
        summary: 'Creates new user',
        tags: ['Users'],
        body: User,
    },
    handler:async(request,reply)=>{
        const newUser=request.body as User;
        if(!ObjectId.isValid(newUser.user_id)){
            reply.badRequest('id not valid')
        }else 
        return upsertTouristController(users,newUser);
    }

}),
          server.route({
            method:'DELETE',
            url:'/users/:user_id',
            schema:{
                summary:'Deletes a user',
                tags:['Tourist'],
                params:Type.Object({
                    id:Type.String(),
    
                }),
                },
                handler:async(request,reply)=>{
                    const id=(request.params as any).id as string;
                    if(!ObjectId.isValid(id)){
                        reply.badRequest('id not valid')
                    return}
                    
  
                    return users.filter((elm)=>elm.user_id!==id);
    
                }
              }),
              server.route({
                        method:'GET',
                        url:'/users/:id',
                        schema:{
                            summary:'view one user or null',
                            tags:['Tourist'],
                            params:Type.Object({
                                id:Type.String({format:'uuid'}),
                
                            }),
                            },
                            handler:async(request,reply)=>{
                                
                                const touristInfo=users.find((elm)=>elm.user_id===(request.params as any).id as string);
                                return touristInfo;
                
                            }
                          })
                        }

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
