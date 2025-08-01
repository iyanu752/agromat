import axios from '@/config/axios'
import API_ENDPOINTS from '@/config/endpoints'


const signupUser = async (name: string, email: string, password: string, userType: string) => {
    try {
        const response = await axios.post(API_ENDPOINTS.SIGNUP, {name, email, password, userType});
        if (response.data && response.data.userId) {
            return {success: true, message: "Sign Up Successful"};
        } else {
            return {success: false, message: response.data.message || "Unknown error"};
        }
    }catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Sign Up Failed", error.response?.data || error.message);
        } else {
            console.error("Sign Up Failed", error);
        }
        return {success: false, message: "Sign up Failed: Server Error"}
    }
}



const loginUser = async (email: string , password: string) => {
    try {
        const response = await axios.post(API_ENDPOINTS.LOGIN, {email, password});

        const {message, user, userId, token} = response.data;
        console.log('response data', response)
        if (response.status){
            localStorage.setItem("userId", userId);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            console.log('message success: ', message)
            return {success: true, message, response};
        }else {
            console.log('message failed', message)
            return {success: false, message};
        }
    }catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Login Failed", error.response?.data || error.message)
        }
    }
}

export {signupUser, loginUser};