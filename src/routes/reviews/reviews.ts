import { FastifyInstance } from "fastify";
import { Static,Type } from "@sinclair/typebox";;
import { ObjectId } from "bson";
import { prismaClient } from "../../prisma";
import { timeStamp } from "console";
import { Rate, Review } from "@prisma/client";


const Reviews=Type.Object({
    review_id:Type.String(),
    rate:Type.Enum(Rate),
    created_at:Type.String(timeStamp),
    tourist_id:Type.String(),
    tourguide_id:Type.String()
})
export const reviewParams=Type.Object({
    review_id:Type.String()
})
export const reviewWithoutId=Type.Object({
    rate:Type.Enum(Rate),
    tourist_id:Type.String(),
    tourguide_id:Type.String()
})
export type reviewWithoutId=Static<typeof reviewWithoutId>
// type TouristIdParams=Static<typeof TouristIdParams
 export type reviewParams=Static<typeof reviewParams>
// export let reviews:Review[]=[
//     {review_id:new ObjectId().toHexString(),
// rate:'excellent',
// tourist_id:'03c-cd3ffa58876f',
// tourguide_id:new ObjectId().toHexString(),
// }]

export default async function(server:FastifyInstance){
    server.route({
        method:'PUT',
        url:'/create',
        schema:{
            summary:'post a review',
            tags:['Reviews'],
            body:Reviews
        },
        handler: async (request, reply) => {
            const newReview=request.body as Review ;
            return await prismaClient.review.create({
                data:newReview
			//return postcommentController(reviews,request.body);
		})
    }
}),
server.route({
    method:'GET',
    url:'/:review_id',
    schema:{
        summary:'view review info',
        tags:['Reviews'],
        params:Type.Object({
            review_id:Type.String()
        })
        // response:{
        //     '2xx':Type.Union([Reviews,Type.Null()])

        },
        handler:async(request,reply)=>{
            const {review_id}=request.params as any;
            if(!ObjectId.isValid(review_id)){
                reply.badRequest('invalid id')
            return;}
            
         return await prismaClient.review.findMany({
            where:{review_id},

      })
    }}
    )
    server.route({
        method:'GET',
        url:'/review',
        schema:{
            summary:'view all Reviews',
            tags:['Reviews'],
            //  response:{
            //      '2xx':Type.Union([Tourist,Type.Null()])
            },
       
            handler:async(request,reply)=>{
            
                return await prismaClient.review.findMany();  
            
            }})
//     server.route({
//         method:'DELETE',
//         url:'/comment/delete/:id',
//         schema:{
//             summary:'Delete a comment',
//             tags:['Comments'],
//             params:Type.Object({
//                 id:Type.String({format:'uuid'}),

//             }),
//             },
//             handler:async(request,reply)=>{
                

//                 return reviews.filter((elm)=>elm.review_id!==(request.params as any).id as string);;

//             }
//           }),
//           server.route({
//             method:'GET',
//             url:'/comments/:id',
//             schema:{
//                 summary:'view comments on Tour Guide',
//                 tags:['Comments'],
//                 params:Type.Object({
//                     id:Type.String(),
    
//                 }),
//                 },
//                 handler:async(request,reply)=>{
                    
//                     const commentMessage=reviews.find((elm)=>elm.review_id===(request.params as any).id as string);
//                     return commentMessage;
    
//                 }
//               })
// }
    }