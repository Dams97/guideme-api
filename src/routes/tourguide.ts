import { FastifyInstance } from "fastify";
import { Static,Type } from "@sinclair/typebox";
import {insertGuideController,UpdateGuideController} from '../controllers/tourguidecontroller'

// import {UpdateGuideController} from '../controllers/tourguidecontroller'


 const TourGuide=Type.Object({
    id:Type.String({format:'uuid'}),
    name:Type.String(),
    email:Type.String(),
    age:Type.Integer(),
    phone_No:Type.String(),
    gender:Type.String(),
    city:Type.String(),
    languages:Type.String([]),
});

type TourGuide=Static<typeof TourGuide>

const GetGuideQuery = Type.Object({
	city: Type.Optional(Type.String()),
});
type GetGuideQuery=Static<typeof GetGuideQuery>

export let tourGuide:TourGuide[]=[
    {id:'100d4e1d-9d43-4271-b2fc-6cbc6f135519',name:'Abdullah',email:'abdullah@test',age:32,phone_No:'0534875473',gender:'male',city:'Riyadh',languages:'Arabic/English'},
    {id:'100d4e1d-9d43-4271-b2fc-6cbc6f135555',name:'wasayef',email:'wasayef@test',age:25,phone_No:'053487999',gender:'female',city:'Jeddah',languages:'Arabic/English'},
    {id:'100d4e1d-9d43-4271-b2fc-6cbc6f138885',name:'Hadi',email:'hadi@test',age:25,phone_No:'053487999',gender:'male',city:'Riyadh',languages:'Arabic/English/French'}
]

export default async function(server:FastifyInstance) {
//create a user
    server.route({
        method:'PUT',
        url:'/create/tourgiude',
        schema:{
            summary:'create a new Tour Guide',
            tags:['TourGuide'],
            body:TourGuide
        },
        handler: async (request, reply)=>{
            return insertGuideController(tourGuide,request.body);
        }
    })
    //view tour guide info by id
    server.route({
        method:'GET',
        url:'/tourgiudes/:id',
        schema:{
            summary:'View Tour Guide',
            tags:['TourGuide'],
           params:Type.Object({
               id:Type.String({format:'uuid'})
           }),
           response: {
            '2xx': Type.Union([TourGuide, Type.Null()])
        },
    },
        handler: async (request, reply)=>{
            return tourGuide.find((elm)=>elm.id===(request.params as any).id as string)?? null;
        }
    })

//update the user
    server.route({
        method: 'PATCH',
		url: '/tourguide/update/:id',
		schema: {
			summary: 'Update a tour guide by id + you dont need to pass all properties',
			tags: ['TourGuide'],
			body: Type.Partial(TourGuide),
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			return UpdateGuideController(tourGuide,request.body as any);
		},}),
        //Delete user
    server.route({
        method:'DELETE',
        url:'/tourguide/delete/:id',
        schema:{
            summary:'Delete a tour guide by id',
            tags:['TourGuide'],
            params:Type.Object({
                id:Type.String({format:'uuid'}),
            }),  
        },
        handler:async(request,reply)=>{
            return tourGuide.filter((el)=>el.id!==(request.params as any).id as string);
        }
    }),
    //Query Search
    server.route({
        method:'GET',
        url:'/tourguides',
        schema:{
            summary:'Gets all Tour Guides in This city',
            tags:['TourGuide'],
            querystring:GetGuideQuery,
            response:{
                '2xx':Type.Array(TourGuide)
            }
        },
        handler:async(request,reply)=>{
            const query=request.query as GetGuideQuery
            if(query.city){
                return tourGuide.filter((elm)=>elm.city.includes(query.city??''));
            }else
            {
                return tourGuide
            }
        }
        
    })    
}