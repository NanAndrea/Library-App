import { BASE_URL, fentchAndParse,headers } from "./utils";

export function myBooks(){
    return fentchAndParse(`${BASE_URL}/book/my-books`,{
       headers
    })

};

export function allBooks(){
    return fentchAndParse(`${BASE_URL}/book`, {
        headers
    })
}