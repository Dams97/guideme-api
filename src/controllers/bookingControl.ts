
            
            export async function UpdateBookController(res: any[],book: any[]){
                const resIndex = res.findIndex((el) => el.booking_id ===(book as any).id as string);
                if (resIndex === -1){
                    return 'you have not book yet !'
                }else{
                    res[resIndex]={
                        ...res[resIndex],
                        ...book[resIndex],
                       
                    }
                }return res;
            }