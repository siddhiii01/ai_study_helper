import React from "react"
import axios from "axios"
import {useForm} from "react-hook-form"

export const StudyHelper = () => {

    const {register, handleSubmit, reset} = useForm();

    const onSubmit = async (data) => {
        try{
            const repsonse = await axios.posst( "http://localhost:5000/api/input", data);
            console.log("response from backend: ", repsonse.data)
            reset();
        }catch (error) {
            console.error("error sending data:", error);
         }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="text"
                    placeholder="Enter something "
                    {...register("userInput")}
                />

                <button type="submit">Send</button>
            </form>
        </>
    )
}