import { BookPayment, Status,Reservation } from "@prisma/client";
import { Static,Type } from "@sinclair/typebox";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify";
import { UpdateBookController } from "../../controllers/bookingControl";



 const Reservation=Type.Object({
    booking_id:     Type.String(),        
    booking_status:  Type.Enum(Status),
    payment:       Type.Enum(BookPayment),
    created_at:Type.String(),
    user_id:Type.String(),
    tourguide_id:Type.String()


    }
 
)

//type Reserv=Static<typeof Reserv>

export let res:Reservation[]=[
    {booking_id:new ObjectId().toHexString(),
    booking_status:'pending',
    payment:'card',
    created_at:new Date,
    user_id:new ObjectId().toHexString(),
    tourguide_id:new ObjectId().toHexString(),

    }
];
export default async function(server:FastifyInstance){
    // server.route({
    // method: "PATCH",
    // url: "/reservation/update/:booking_id",
    // schema:{
    //     summary:'update the reservation schedule',
    //     tags:['Booking'],
    //     body: Type.Partial(Reservation),
    //     params: Type.Object({
    //         booking_id: Type.String(),
    // })
    // },
    // handler: async(request,reply)=>{

    //     return UpdateBookController(res,request.body as any);
    //         }
    //     }),
        server.route({
            method:'GET',
            url:'/booking/:booking_id',
            schema:{
                summary:'view booking info',
                tags:['booking'],
                params:Type.Object({
                   booking_id:Type.String(),
    
                }),
                },
                handler:async(request,reply)=>{
                    
                    const bookingInfo=res.find((elm)=>elm.booking_id===(request.params as any).booking_id as string);
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
                        booking_id:Type.String({format:'uuid'}),
                    }),  
                },
                handler:async(request,reply)=>{
                    return res.filter((el)=>el.booking_id!==(request.params as any).id as string);
                }
            })
    }
 