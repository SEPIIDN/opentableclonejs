'use client';

import { useState, createContext, useEffect } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";

export const AuthenticationContext = createContext({
    loading: false,
    data: null,
    error: null,
    setAuthState: () => { }
});

export default function AuthContext({ children }) {
    const [authState, setAuthState] = useState({
        loading: false,
        data: null,
        error: null
    })
    const fetchUser = async () => {
        setAuthState({
            loading: true,
            error: null,
            data: null
        })
        try {
            const jwt = getCookie("jwt");

            if (!jwt) {
                return setAuthState({
                    loading: false,
                    error: null,
                    data: null
                })
            }
            const response = await axios.get("http://localhost:3000/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

            setAuthState({
                loading: false,
                error: null,
                data: response.data
            })

        } catch (error) {
            console.log({ data })
            setAuthState({
                loading: false,
                error: error.response.data.errorMessage,
                data: null
            })
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>{children}</AuthenticationContext.Provider>
    )
}
