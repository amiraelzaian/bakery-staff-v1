import { Outlet } from "react-router";
import Header from "../components/Header";
import { useBakerOrders } from "../hooks/useBaker";

const NAV_LINKS = [
  { label: "My Orders", to: "/baker/orders" },
  { label: "Dashboard", to: "/baker/dashboard" },
];


export default function BakeryLayout(){


  const {orders}=useBakerOrders()
  console.log(orders)

    return <main className="">
        <Header links={NAV_LINKS}/>
         <main className="mx-auto max-w-5xl p-4 pb-24 md:pb-6">
        <Outlet/>
      </main>

    </main>
}