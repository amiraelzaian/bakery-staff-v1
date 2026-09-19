import { useMutation } from "@tanstack/react-query"
import { login, googleLogin } from "../services/auth.service"
import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { HOME_BY_ROLE } from "../routes/roles";





function useOnAuthSuccess(){

    const navigate = useNavigate();
    const setAuth=useAuthStore(s=>s.setAuth);

    return (res)=>{
        setAuth({token:res.token,user:res.data});
        navigate(HOME_BY_ROLE[res.data.role],{replace:true});
    };
}


function assertStaff(res){
    if(!HOME_BY_ROLE[res.data.role]){
        throw new Error("This account cannot access the dashbaord");
    }
    return res;
}


export function useLogin(){
    const onSuccess=useOnAuthSuccess();

    const mutation = useMutation({
        mutationFn:async ({ email, password })=>assertStaff(await login(email,password)),
        onSuccess,
    })

    return {
        login: mutation.mutate,
        isPending: mutation.isPending,
        error: mutation.error,
    };
}

export function useGoogle(){
    const onSuccess=useOnAuthSuccess();

    const mutation = useMutation({
        mutationFn: async(credential) => assertStaff(await googleLogin(credential)),
        onSuccess,
    })

    return {
        loginWithGoogle: mutation.mutate,
        isPending: mutation.isPending,
        error: mutation.error,
    };
}
