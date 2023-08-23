import { BASE_URL, fentchAndParse,headers } from "./utils";

export function myBooks(){
    return fentchAndParse(`${BASE_URL}/book/my-books`,{
       headers
    })

};

export function getAllBooks(){
    return fentchAndParse(`${BASE_URL}/book`, {
        headers
    })
}

export function getBookById(id){
    return fentchAndParse(`${BASE_URL}/book/${id}`)
}

export function addBook(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("file", data,file);

    const newHeaders = {...headers};
    delete newHeaders["Content-Type"];

    return fentchAndParse(`${BASE_URL}/book`, {
        method: "POST",
        body: formData,
        headers: newHeaders
    })

}