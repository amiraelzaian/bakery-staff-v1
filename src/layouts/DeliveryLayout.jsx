import { Outlet } from "react-router";
import Header from "../components/Header";

const NAV_LINKS = [
  { label: "My Deliveries", to: "/delivery/deliveries" },
  { label: "Dashboard", to: "/delivery/dashboard" },
];


export default function DeliveryLayout(){


    return <main className="">
        <Header links={NAV_LINKS}/>
         <main className="mx-auto max-w-5xl p-4 pb-24 md:pb-6">
        <Outlet/>
      </main>

    </main>
}