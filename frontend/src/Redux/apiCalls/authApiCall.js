
import { authActions } from "../slices/authSlice"; 
import axios from "axios";
import { toast } from "react-toastify";

// Login User
export function loginUser(user){

    return async (dispatch)=>{
        try {
            
            // const response = await fetch("http://localhost:8000/api/auth/login", {
            //     method:"POST",
            //     body: JSON.stringify(user),
            //     headers:{
            //         "Content-Type": "application/json"
            //     }
            // });
            // const data = await response.json();
            const {data} = await axios.post("http://localhost:8000/api/auth/login", user)

            console.log(data)
            dispatch(authActions.login(data));

            // this to keep user after refresh 
            localStorage.setItem("userInfo", JSON.stringify(data));

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error)
        }

    }
}

export function logoutUser(){

    return (dispatch)=>{
        
            dispatch(authActions.logout());
            localStorage.removeItem("userInfo");
        

    }
}

export function registerUser(user){

    return async (dispatch)=>{
        try {
            const {data} = await axios.post("http://localhost:8000/api/auth/register", user)
            
// In case i want to longin immediately

            if(typeof(data)=="object"){
                console.log(data)
                // dispatch(authActions.register(data));
                dispatch(authActions.register("go to log in page"))
//++++++++++++++++++++++++++++++++++++++++++++
            
            }else{
                dispatch(authActions.register(data.message));
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}
