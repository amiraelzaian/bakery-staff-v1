import { Navigate } from "react-router";
import BrandPanel from "../../components/BrandPanel";
import LoginForm from "../../components/LoginForm";
import { useAuthStore } from "../../stores/authStore";
import { HOME_BY_ROLE } from "../../routes/roles";



export default function LoginPage() {
  const user=useAuthStore(s=>s.user);
  if(user) return <Navigate to={HOME_BY_ROLE[user.role]} replace/>

  return  <main className="min-h-screen bg-background">
    <div className="grid min-h-screen lg:grid-cols-[44%_56%]">
      <BrandPanel />

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </section>
    </div>
    </main>
}