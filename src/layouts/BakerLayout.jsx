import { Outlet } from "react-router";
import Header from "../components/Header";
import { ScrollToTop } from "../components/common/ScrollToTop";
import { useRef } from "react";

const NAV_LINKS = [
  { label: "My Orders", to: "/baker/orders" },
  { label: "Profile", to: "/baker/profile" },
 
];

export default function BakeryLayout() {
    const scrollRef = useRef(null);
  return (
    <div className="custom-scrollbar">
      <Header links={NAV_LINKS} />
      <main ref={scrollRef} className="mx-auto max-w-7xl p-4 pb-24 md:pb-6">
        <Outlet />
      </main>
        <ScrollToTop containerRef={scrollRef} />
    </div>
  );
}