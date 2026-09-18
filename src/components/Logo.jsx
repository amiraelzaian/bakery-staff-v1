



export default function Logo() { 

  return (
    <section className="flex justify-center items-center gap-2">
    <a href="/">
      <img
        src="/images/logo.png"
        alt="CREME & CRUMB logo"
        width={45}
        height={45}
        className="object-fill"
      />
    </a>

      <h1 className={`text-primary font-bold text-2xl md:text-4xl font-lovers-quarrel`}>Golden Crumbs</h1>
    
    </section>
  );
}