import { BASE_URL, fentchAndParse,headers } from "./utils";

export function login(data){
    return fentchAndParse(`${BASE_URL}/auth/login`,{
        method: "POST",
        body: JSON.stringify(data),
        headers
            
       
    })
    
}



export function register(data){
    return fentchAndParse(`${BASE_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers
    })
}