import { FastifyInstance } from 'fastify';
// import * as bcrypt from 'bcrypt';
import { Static,Type } from "@sinclair/typebox";

import { prismaClient } from '../prisma';
import bcrypt from "bcrypt";
import { createGuideSchema } from './tourguide/tourguide';
  

export const loginTourGuide=Type.Object({
    email:    Type.String() ,    
    password:  Type.String() ,  
  
})
export type loginTourGuide=Static<typeof loginTourGuide>
const JwtVerificationSchema = Type.Object({
	token: Type.String(),
  });
  type JwtVerificationSchema=Static<typeof JwtVerificationSchema>

      //reservations:Type.Array(Reserv),
     //comments:Type.Array(Comment)


    // reservations:Type.Optional(Type.Array(Reservation))

//login
export default async function(server:FastifyInstance) {
	server.route({
		method:'POST',
		url:'/tourguide/login',
		schema:{
			summary:'Ask user to login and returns summary',
			tags:['TourGuide'],
			body:loginTourGuide
		},
		handler:async (request,reply)=>{
			const loginForGuide=request.body as loginTourGuide
			
			const checkGuide=await prismaClient.tourguide.findFirst({
				where:{email:loginForGuide.email}
			});
			//if new user?
			if(!checkGuide){		
				const newtourguide = request.body as createGuideSchema;
			if(!newtourguide){
				reply.badRequest("Please enter all required fields");
			}
			const guideExist=await prismaClient.tourguide.findFirst({
				where:{email:newtourguide.email}
			});
			if(guideExist){
				reply.badRequest("User already exists")
			}
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(newtourguide.password, salt)
			const guidenew= await prismaClient.tourguide.create({
				data:{
					email:newtourguide.email,
					name:newtourguide.name,
					password:hashedPassword,
					phone:newtourguide.phone,
                    city:newtourguide.city
                    

				}
			}); const token = server.jwt.sign({
				id: guidenew.tourguide_id,
				email: guidenew.email,
				name: guidenew.name,
			});


			return {
			token,
		type:'SignUp'};
		
		}else {
			if(checkGuide && (await bcrypt.compare(loginForGuide.password,checkGuide.password))){
				const token=server.jwt.sign({id:checkGuide.tourguide_id,name:checkGuide.name,email:checkGuide.email})
				reply.send({message:"You are logged in",
				data:{name:checkGuide.name,id:checkGuide.tourguide_id,token,type:'SignIn'}});

			}else{
				reply.unauthorized('Incorrect email or password')
			}
		
		}
	
	
		
	}
})


}


