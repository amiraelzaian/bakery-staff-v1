import { Outlet } from "react-router";
import Header from "../components/Header";
import { useDelivery } from "../hooks/useDelivery";
import { useAuthStore } from "../stores/authStore";

const NAV_LINKS = [
  { label: "My Deliveries", to: "/delivery/deliveries" },
  { label: "Dashboard", to: "/delivery/dashboard" },
];


export default function DeliveryLayout(){
  const user=useAuthStore(s=>s.user)
  console.log(user)
const {deliveries,isPending,error}=useDelivery(user?._id)
console.log({ deliveries, isPending, error });

    return <main className="">
        <Header links={NAV_LINKS}/>
         <main className="mx-auto  p-4 pb-24 md:pb-6">
        <Outlet/>
      </main>

    </main>
}