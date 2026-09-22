import { Outlet } from "react-router";
import Header from "../components/Header";

const NAV_LINKS = [
  { label: "My Deliveries", to: "/delivery/deliveries" },
  { label: "Profile", to: "/delivery/profile" },
];

export default function DeliveryLayout() {
  return (
    <div className="custom-scrollbar">
      <Header links={NAV_LINKS} />
      <main className="mx-auto max-w-7xl p-4 pb-24 md:pb-6">
        <Outlet />
      </main>
    </div>
  );
}