    import {res} from "../routes/reservation"
            
            export function UpdateBookController(reserve: any[],book: any[]){
                const resIndex = res.findIndex((el) => el.id ===(book as any).id as string);
                if (resIndex === -1){
                    return 'you have not book yet !'
                }else{
                    reserve[resIndex]={
                        ...res[resIndex],
                        ...book,
                       
                    }
                }return res;
            }