
import { tourGuide } from "../routes/tourguide";


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
    const userIndex = tourgiude.findIndex((el) => el.id === (user as any).id as string);
	if (userIndex === -1){
        return 'There is no such a user with this id!'
    }else{
        tourgiude[userIndex]={
            ...tourGuide[userIndex],
            ...user,
           

        }
    }return tourgiude;
}