import { Outlet } from "react-router";
import Header from "../components/Header";




export default function AdminLayout(){


    return <main className="">
        <Header />
         <main className="mx-auto max-w-5xl p-4 pb-24 md:pb-6">
        <Outlet/>
      </main>

    </main>
}