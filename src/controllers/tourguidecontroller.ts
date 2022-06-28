//import { tourGuide } from "../routes/tourguide";

import tourGuide from "../routes/tourguide/tourguide";


export function insertGuideController(tourgiude: any[], newUser: any) {
	const userIndex = tourgiude.findIndex((el) => el.id === newUser.id);
	if (userIndex === -1) {
		tourgiude.push(newUser);
	} else {
	return 'The user is already exist'
	}
	return tourgiude;
}

export function UpdateGuideController(tourgiude: any[],user: any[]){
    const userIndex = tourgiude.findIndex((el) => el.tourguide_id === (user as any).tourguide_id as string);
	if (userIndex === -1){
        return 'There is no such a user with this id!'
    }else{
        tourgiude[userIndex]={
            ...tourGuide[userIndex],
            ...user,
           

        }
    }return tourgiude;
}