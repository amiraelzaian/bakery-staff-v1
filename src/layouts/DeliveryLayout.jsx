import { Outlet } from "react-router";
import Header from "../components/Header";
import { useDeliveries } from "../hooks/useDelivery";

const NAV_LINKS = [
  { label: "My Deliveries", to: "/delivery/deliveries" },
  { label: "Dashboard", to: "/delivery/dashboard" },
];


export default function DeliveryLayout(){
  
const {deliveries,isPending,error}=useDeliveries()
console.log(deliveries)

console.log({ deliveries, isPending, error });

    return <main className="">
        <Header links={NAV_LINKS}/>
         <main className="mx-auto max-w-7xl p-4 pb-24 md:pb-6">
        <Outlet/>
      </main>

    </main>
}