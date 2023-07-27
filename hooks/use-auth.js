import axios from "axios";
import { removeCookies } from "cookies-next";
import { useContext } from "react";
import { AuthenticationContext } from "../context/auth-context";

const useAuth = () => {
    const { setAuthState } = useContext(AuthenticationContext);

    const signin = async ({ email, password }, handleClose) => {
        setAuthState({
            loading: true,
            error: null,
            data: null
        })
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signin", { email, password });
            setAuthState({
                loading: false,
                error: null,
                data: response.data
            })
            handleClose();
            // console.log(response);
        } catch (error) {
            setAuthState({
                loading: false,
                error: error.response.data.errorMessage,
                data: null
            })
            // console.log(error)
        }
    };
    const signup = async ({ email, password, firstName, lastName, city, phone }, handleClose) => {
        setAuthState({
            loading: true,
            error: null,
            data: null
        })
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup", { email, password, firstName, lastName, city, phone });
            setAuthState({
                loading: false,
                error: null,
                data: response.data
            })
            handleClose();
            // console.log(response);
        } catch (error) {
            setAuthState({
                loading: false,
                error: error.response.data.errorMessage,
                data: null
            })
            // console.log(error)
        }
    };

    const signout = () => {
        removeCookies("jwt");

        setAuthState({
            loading: false,
            error: null,
            data: null
        })
    }

    return {
        signin,
        signup,
        signout
    }
}

export default useAuth;