import { Link } from "react-router";

export default function Logo() {
  return (
   
    <Link to="/" className="flex shrink-0 items-center gap-2">
      <img
        src="/images/logo.png"
        alt="Golden Crumbs logo"
        width={45}
        height={45}
        className="shrink-0 object-fill"
      />

      <span className="whitespace-nowrap font-lovers-quarrel text-2xl font-bold text-primary md:text-4xl">
        Golden Crumbs
      </span>
    </Link>
  );
}