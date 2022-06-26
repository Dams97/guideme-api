import { FastifyInstance } from "fastify";
import { Static,Type } from "@sinclair/typebox";
import { tourist } from "./tourists";
import { tourGuide } from "./tourguide";
import { postcommentController } from "../controllers/comment";


const Comments=Type.Object({
    id:Type.String({format:'uuid'}),
    message:Type.String(),
    tourist_id:Type.String(),
    tourGuide_id:Type.String()
})

type Comments=Static<typeof Comments>

export let comments:Comments[]=[
    {id:'33698e9b-268c-40be-a2d1-8f80a0b280bf',
message:'Very Good',
tourist_id:'0655f6c3-5420-474c-b83c-cd3ffa58876f',
tourGuide_id:'100d4e1d-9d43-4271-b2fc-6cbc6f138885',
}]

export default async function(server:FastifyInstance){
    server.route({
        method:'PUT',
        url:'/comment/create',
        schema:{
            summary:'post a comment',
            tags:['Comments'],
            body:Comments
        },
        handler: async (request, reply) => {
			return postcommentController(comments,request.body);
		}
    }),
    server.route({
        method:'DELETE',
        url:'/comment/delete/:id',
        schema:{
            summary:'Delete a comment',
            tags:['Comments'],
            params:Type.Object({
                id:Type.String({format:'uuid'}),

            }),
            },
            handler:async(request,reply)=>{
                

                return comments.filter((elm)=>elm.id!==(request.params as any).id as string);;

            }
          }),
          server.route({
            method:'GET',
            url:'/comments/:id',
            schema:{
                summary:'view comments on Tour Guide',
                tags:['Comments'],
                params:Type.Object({
                    id:Type.String({format:'uuid'}),
    
                }),
                },
                handler:async(request,reply)=>{
                    
                    const commentMessage=comments.find((elm)=>elm.id===(request.params as any).id as string);
                    return commentMessage;
    
                }
              })
}