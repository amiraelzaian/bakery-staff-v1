import { Outlet } from "react-router";
import Header from "../components/Header";

const NAV_LINKS = [
  { label: "My Orders", to: "/baker/orders" },
  { label: "Profile", to: "/baker/profile" },
 
];

export default function BakeryLayout() {
  return (
    <div className="custom-scrollbar">
      <Header links={NAV_LINKS} />
      <main className="mx-auto max-w-7xl p-4 pb-24 md:pb-6">
        <Outlet />
      </main>
    </div>
  );
}