import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { HOME_BY_ROLE } from "./roles";




export default function ProtectedRoute({allowedRoles}){

  const token=useAuthStore((s)=>s.token)
  const user=useAuthStore((s)=>s.user)

// 1- not logged in --> login page

if(!token||!user) return <Navigate to="/" replace/>

//2- logged in but wrong role --> send him to his home

if(!allowedRoles.includes(user.role)){
  return <Navigate to={HOME_BY_ROLE[user.role] ?? "/"} replace/>
}

//3- allowed --> render the child routes

return <Outlet/>



}