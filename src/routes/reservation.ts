import { Static,Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
//import { tourist } from "./tourists";
//import { tourGuide } from "./tourguide";
import {UpdateBookController} from "../controllers/bookingControl"


const Reserv=Type.Object({
    id:Type.String({format:'uuid'}),
    tourist_id:Type.String(),
    tourGuide_id:Type.String(),
    bookingStatus:Type.Boolean()
})

type Reserv=Static<typeof Reserv>
export let res:Reserv[]=[
    {id:'b43ad496-6d09-4b8c-a529-cd8fa3dbb638',
    tourist_id:'0655f6c3-5420-474c-b83c-cd3ffa58865f',
    tourGuide_id:'00d4e1d-9d43-4271-b2fc-6cbc6f135519',
    bookingStatus:true}
];
export default async function(server:FastifyInstance){
    server.route({
    method: "PATCH",
    url: "/reservation/update/:id",
    schema:{
        summary:'update the reservation schedule',
        tags:['Booking'],
        body: Type.Partial(Reserv),
        params: Type.Object({
            id: Type.String({ format: 'uuid' }),
    })
    },
    handler: async(request,reply)=>{

        return UpdateBookController(res,request.body as any);
            }
        }),
        server.route({
            method:'GET',
            url:'/booking/:id',
            schema:{
                summary:'view booking info',
                tags:['booking'],
                params:Type.Object({
                    id:Type.String({format:'uuid'}),
    
                }),
                },
                handler:async(request,reply)=>{
                    
                    const bookingInfo=res.find((elm)=>elm.id===(request.params as any).id as string);
                    return bookingInfo;
    
                },
                

              }),
              server.route({
                method:'DELETE',
                url:'/booking/delete/:id',
                schema:{
                    summary:'cancel the reservation',
                    tags:['Booking'],
                    params:Type.Object({
                        id:Type.String({format:'uuid'}),
                    }),  
                },
                handler:async(request,reply)=>{
                    return res.filter((el)=>el.id!==(request.params as any).id as string);
                }
            })
    }
 