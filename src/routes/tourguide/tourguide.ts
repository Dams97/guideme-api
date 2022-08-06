import { prismaClient } from '../../prisma';
import { FastifyInstance } from "fastify";
import { Static,Type } from "@sinclair/typebox";
import { Languages,Rate,Tourguide } from "@prisma/client";
import { ObjectId } from 'bson';
import _, { constant } from 'lodash';
//import { Review } from '../reviews/reviews';



 export const TourGuide=Type.Object({
    tourguide_id:Type.String(),
    name:Type.String(),
    email:Type.String(),
    password:Type.String(),
    phone:Type.String(),
    languages:Type.Array(Type.Enum(Languages)),
    experience:Type.String(),
    city:Type.String(),
    price:Type.String(),
    //reservations:Type.Array(Reserv),
   //comments:Type.Array(Comment)

    
});
export type TourGuide=Static<typeof TourGuide>
export const createGuideSchema=Type.Object({
    name:Type.String(),
    email:Type.String(),
    password:Type.String(),
    phone:Type.String(),
    city:Type.String()
    //reservations:Type.Array(Reserv),
   //comments:Type.Array(Comment)

    
});
export type createGuideSchema=Static<typeof createGuideSchema>
export const tourguideIdParams=Type.Object({
    tourguide_id:Type.String()
})
export type tourguideIdParams=Static<typeof tourguideIdParams>
// type Tourguide=Static<typeof Tourguide>
// export let tourGuide:Tourguide[]=[
//     {tourguide_id:new ObjectId().toHexString(),name:'Ahmad',
// email:'ahm@test',phone:'345',languages:['Arabic'],experience:'3years',city:'Jeddah',price:'1000SR'}
// ]
// const GetGuideQuery = Type.Object({
// 	city: Type.Optional(Type.String()),
   
// });
//type GetGuideQuery=Static<typeof GetGuideQuery>




export default async function (server: FastifyInstance) {
// server.route({
//     method: 'POST',
//     url: '/create',
//     schema: {
//         summary: 'Creates new tourist',
//         tags: ['TourGuide'],
//         body:createGuideSchema,
//     },
//     handler: async (request, reply) => {
//         const insertGuide = request.body as createGuideSchema;
//         return await prismaClient.tourguide.create({
//             data:insertGuide
//         });
//     },
// }),
        server.route({
            method:'GET',
            url:'/',
            schema:{
                summary:'view all tour guides',
                tags:['TourGuide'],
            },
                handler:async(request,reply)=>{
                
                    return await prismaClient.tourguide.findMany();  
                    
                }}),
                // server.route({
                //     method: 'PATCH',
                //     url: '/:tourguide_id',
                //     schema: {
                //         summary: 'Update a tour guide by id + you dont need to pass all properties',
                //         tags: ['TourGuide'],
                //         body:Type.Partial(TourGuide),
                //         params:tourguideIdParams
                      
                //     },
                //     handler: async (request, reply) => {
                //         const { tourguide_id } = request.params as tourguideIdParams;
                //         if (!ObjectId.isValid(tourguide_id)) {
                //             reply.badRequest('tourguide_id should be an ObjectId!');
                //             return;
                //         }
                //         const guideUpdate = request.body as any ;
            
                //         return prismaClient.tourguide.update({
                //             where: { tourguide_id },
                //             data: guideUpdate,
                //         })}
                //     }),
                
                    
                      server.route({
                        method:'DELETE',
                        url:'/:tourguide_id',
                        schema:{
                            summary:'Deletes a tour guide',
                            tags:['TourGuide'],
                            params:tourguideIdParams,
                
                        },
                            handler:async(request,reply)=>{
                                const {tourguide_id}=request.params as tourguideIdParams;
                                if(!ObjectId.isValid(tourguide_id)){
                                    reply.badRequest('invalid id')
                                return ;
                            }
                                
              
                                return await prismaClient.tourguide.delete({
                                    where:{tourguide_id},
                                })
                
                            }
                          })


            
}
    // server.route({
    //     method: 'PUT',
    //     url: '/user/create',
    //     schema: {
    //         summary: 'Creates new Tour Guide',
    //         tags: ['User'],
    //         body: TourGuide,
    //     },
    //     handler: async (request, reply) => {
    //         const newData= request.body as Tourguide;
    //         if(newData.tourguide_id){
    //             const olddata = await prismaClient.tourguide.findUnique({where:{
    //                 tourguide_id:newData.tourguide_id
    //             }})
    //             const updateUser = await prismaClient.tourguide.update({
    //                 where: {
    //                   tourguide_id:newData.tourguide_id,
    //                 },
    //                 data: {
    //                   ...olddata,
    //                     ...newData
    //               }})
    //         }else{
    //             await prismaClient.tourguide.create({
    //                 data:{
    //                     name:newData.name,
    //                     email:newData.email,
    //                     phone:newData.phone,
    //                     languages:newData.languages,
    //                     experience:newData.experience,
    //                     city:newData.city,
    //                     price:newData.price
    
    //                 },
    //             });
    //         }
    
    //         return prismaClient.user.findMany();
    //     },
    // });
    
    // }
    //view tour guide info by id
//     server.route({
//         method:'GET',
//         url:'/tourgiudes/:id',
//         schema:{
//             summary:'View Tour Guide',
//             tags:['TourGuide'],
//            params:Type.Object({
//                id:Type.String({format:'uuid'})
//            }),
//            response: {
//             '2xx': Type.Union([TourGuide, Type.Null()])
//         },
//     },
//         handler: async (request, reply)=>{
//             return tourGuide.find((elm)=>elm.id===(request.params as any).id as string)?? null;
//         }
//     })

// //update the user
//     server.route({
//         method: 'PATCH',
// 		url: '/tourguide/update/:id',
// 		schema: {
// 			summary: 'Update a tour guide by id + you dont need to pass all properties',
// 			tags: ['TourGuide'],
// 			body: Type.Partial(TourGuide),
// 			params: Type.Object({
// 				id: Type.String({ format: 'uuid' }),
// 			}),
// 		},
// 		handler: async (request, reply) => {
// 			return UpdateGuideController(tourGuide,request.body as any);
// 		},}),
//         //Delete user
//     server.route({
//         method:'DELETE',
//         url:'/tourguide/delete/:id',
//         schema:{
//             summary:'Delete a tour guide by id',
//             tags:['TourGuide'],
//             params:Type.Object({
//                 id:Type.String({format:'uuid'}),
//             }),  
//         },
//         handler:async(request,reply)=>{
//             return tourGuide.filter((el)=>el.id!==(request.params as any).id as string);
//         }
//     }),
//     //Query Search
//     server.route({
//         method:'GET',
//         url:'/tourguides',
//         schema:{
//             summary:'Gets all Tour Guides in This city',
//             tags:['TourGuide'],
//             querystring:GetGuideQuery,
//             response:{
//                 '2xx':Type.Array(TourGuide)
//             }
//         },
//         handler:async(request,reply)=>{
//             const query=request.query as GetGuideQuery
//             if(query.city){
//                 return tourGuide.filter((elm)=>elm.city.includes(query.city??''));
//             }else
//             {
//                 return tourGuide
//             }
//         }
        
//     })    
// }