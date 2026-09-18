import { useMutation } from "@tanstack/react-query"
import { login, googleLogin } from "../services/auth.service"
import { useNavigate } from "react-router";

export function useLogin(){
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: ({ email, password }) => login(email, password),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);

            if (data.data.role !== 'customer') navigate(`/${data.data.role}`)
        }
    })

    return {
        login: mutation.mutate,
        isPending: mutation.isPending,
        error: mutation.error,
    };
}

export function useGoogle(){
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (credential) => googleLogin(credential),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);

            if (data.data.role !== 'customer') navigate(`/${data.data.role}`)
        }
    })

    return {
        loginWithGoogle: mutation.mutate,
        isPending: mutation.isPending,
        error: mutation.error,
    };
}
