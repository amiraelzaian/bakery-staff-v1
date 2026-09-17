
import Logo from "./Logo";


export default function BrandPanel() {
  return (
    <aside className="relative hidden min-h-screen overflow-hidden lg:flex  ">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/bread2.jpg')",
        }}
      />

      {/* Dark warm overlay — strong enough for full text legibility */}
      <div className="absolute inset-0 bg-brand-panel/50" />

      {/* Subtle gradient for extra depth top/bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-panel-deep via-brand-panel/80 to-brand-panel/85" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-full flex-col justify-between p-10 xl:p-14">
        {/* Brand */}
        <div>
          <Logo />
        </div>

        {/* Main content */}
        <div className="max-w-xl flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
            Member privileges
          </p>

          <h1 className="font-serif text-5xl leading-[1.1] text-foreground drop-shadow-sm xl:text-6xl">
            Slow fermentation,
            <br />
            <span className="italic text-secondary">morning ritual.</span>
          </h1>

          <p className="max-w-md text-sm leading-7 text-foreground/90">
            Join the Golden Crumbs baker&apos;s circle to reserve morning
            bake batches, save your preferences, and follow your artisanal
            deliveries from our oven to your door.
          </p>

          {/* Benefits */}
          <div className="grid max-w-lg grid-cols-2 gap-8">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/50 bg-secondary/15">
                <span className="text-secondary">☀</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Daily 4:30 AM bake</p>
                <p className="mt-1 text-xs leading-5 text-foreground/70">
                  Reserve fresh from the oven
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/50 bg-secondary/15">
                <span className="text-secondary">🥨</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">VIP tasting previews</p>
                <p className="mt-1 text-xs leading-5 text-foreground/70">
                  Seasonal menu access
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="max-w-lg border-t border-foreground/20 pt-6">
          <p className="font-serif text-lg italic leading-7 text-foreground/95">
            &ldquo;The sourdough morning delivery changed our breakfast
            routine completely.&rdquo;
          </p>
          <p className="mt-3 text-xs text-foreground/60">
            — Camille Laurent, Bakery Club Member
          </p>
        </div>
      </div>
    </aside>
  );
}