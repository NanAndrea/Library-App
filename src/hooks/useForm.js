import { useState } from "react";

export function useForm(initialData){
    const [formValues,setFormValue] = useState(initialData);

    function registerField(key){
        return {
            value:formValues[key],
            onChange: (event) =>{
               const newValue=event.target.value;
               setFormValue((formValues) =>({
                ...formValues,
                [key]: newValue,
               }));
            },
        }
    }

    return {
        formValues,
        registerField,
        setFormValue
    }

    
}