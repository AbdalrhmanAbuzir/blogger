import { profileActions } from "../slices/profileSlice"; 
import axios from "axios";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";

// Get User Profile 
export function getUserProfile(userId){

    return async (dispatch)=>{
        try {
            
            const {data} = await axios.get(`http://localhost:8000/api/users/profile/${userId}`)

            console.log(data)
            dispatch(profileActions.setProfile(data));

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error)
        }

    }
}

// Upload Profile Photo
export function uploadProfilePhoto(photo){

    return async (dispatch, getState)=>{
        try {
            
            const {data} = await axios.post(`http://localhost:8000/api/users/profile/profile-photo-upload`, photo,
                {
                    headers:{
                        Authorization: "Bearer " + getState().auth.user.token,
                        "Content-Type" : "multipart/form-data"
                    }
                }
            )

            console.log(data)
            dispatch(profileActions.setProfilePhoto(data.setProfilePhoto));
            
            // to change the photo in auth state
            await dispatch(authActions.setUserPhoto(data.setProfilePhoto));
            
            // update the localstorage 
            const user = JSON.parse(localStorage.getItem("userInfo"))
            user.setProfilePhoto = data?.profilePhoto;
            await localStorage.setItem("userInfo", JSON.stringify(user));
            
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error)
        }

    }
}

// Upload Profile
export function updateProfile(userId, profile){

    return async (dispatch, getState)=>{
        try {
            
            const {data} = await axios.put(`http://localhost:8000/api/users/profile/${userId}`, profile,
                {
                    headers:{
                        Authorization: "Bearer " + getState().auth.user.token,
                    }
                }
            )

            console.log(data)
            dispatch(profileActions.updateProfile(data));
            
            // to change the photo in auth state
            await dispatch(authActions.setUsername(data.username));
            
            // update the localstorage 
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.username = data?.profilePhoto; 
            localStorage.setItem("userInfo", JSON.stringify(user));
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }

    }
}
