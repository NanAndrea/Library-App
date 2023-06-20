export const BASE_URL="https://itschool-library.onrender.com"

export const headers = {
    "Content-Type":"application/json"
}

export function handleTokenUpdate(token){
    if(token){
    headers.Authorization = `Bearer ${token}`;
} else {
    delete headers.Authorization;
}
}

export async function fentchAndParse(input, init){
    const response = await fetch(input,init);
    if(response.status >= 400){
        throw {
            status: response.status,
            data: await response.json()
        }
    }
    return response.json();
}