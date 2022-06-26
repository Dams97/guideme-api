import { Static,Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { upsertTouristController } from "../controllers/upsert-tourist";


const Tourist=Type.Object({
    id:Type.String({format:'uuid'}),
    name:Type.String(),
    email:Type.String(),
    age:Type.Integer(),
    phoneNo:Type.String(),
    gender:Type.String(),
    country:Type.String()
})

type Tourist=Static<typeof Tourist>

export let tourist:Tourist[]=[
    {id:'0655f6c3-5420-474c-b83c-cd3ffa58865f',
    name:'Ahmed',email:'ahmed@test',
    age:22,phoneNo:'0554343424',
    gender:'male',country:'Saudi'},
    {id:'0655f6c3-5420-474c-b83c-cd3ffa58876f',
    name:'Saleh',email:'Saleh@test',
    age:29,phoneNo:'0554345554',
    gender:'male',country:'Saudi'},
]
;
export default async function (server:FastifyInstance) {

    server.route({
        method:'PUT',
        url:'/user/create',
        schema:{
            summary:'create a new user',
            tags:['Tourist'],
            body:Tourist
        },
        handler: async (request, reply) => {
			return upsertTouristController(tourist,request.body);
		}
    })
    server.route({
        method: 'PATCH',
		url: '/user/update/:id',
		schema: {
			summary: 'Update a user by id + you dont need to pass all properties',
			tags: ['Tourist'],
			body: Type.Partial(Tourist),
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			return upsertTouristController(tourist, request.body);
		},
	}),
    server.route({
        method:'GET',
        url:'/users/:id',
        schema:{
            summary:'view user info',
            tags:['Tourist'],
            params:Type.Object({
                id:Type.String({format:'uuid'}),

            }),
            },
            handler:async(request,reply)=>{
                
                const touristInfo=tourist.find((elm)=>elm.id===(request.params as any).id as string);
                return touristInfo;

            }
          }),
          server.route({
            method:'DELETE',
            url:'/users/:id',
            schema:{
                summary:'Delete the user',
                tags:['Tourist'],
                params:Type.Object({
                    id:Type.String({format:'uuid'}),
    
                }),
                },
                handler:async(request,reply)=>{
                    
  
                    return tourist.filter((elm)=>elm.id!==(request.params as any).id as string);;
    
                }
              })

        }
