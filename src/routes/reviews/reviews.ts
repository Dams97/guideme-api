import { FastifyInstance } from "fastify";
import { Static,Type } from "@sinclair/typebox";
//import { tourist } from "./user";
import { postcommentController } from "../../controllers/reviews";
import { Rate,Review } from "@prisma/client";
import { ObjectId } from "bson";


export const Reviews=Type.Object({
    review_id:Type.String(),
    rate:Type.Enum(Rate),
    user_id:Type.String(),
    tourguide_id:Type.String()
})

//type Review=Static<typeof Review>

export let reviews:Review[]=[
    {review_id:new ObjectId().toHexString(),
rate:'Excellent',
user_id:'03c-cd3ffa58876f',
tourguide_id:new ObjectId().toHexString(),
}]

export default async function(server:FastifyInstance){
    server.route({
        method:'PUT',
        url:'/review/create',
        schema:{
            summary:'post a review',
            tags:['Reviews'],
            body:Reviews
        },
        handler: async (request, reply) => {
            const newReview=request.body as Review;
            if(!ObjectId.isValid(newReview.review_id)){
                reply.badRequest('id not valid')
            }return

			return postcommentController(reviews,request.body);
		}
    })}
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