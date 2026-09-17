


import { GoogleLogin } from "@react-oauth/google";

import { useForm } from "react-hook-form";

export default function LoginForm() {
 

  

  

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = watch("email");


  return (
    <div className="w-full max-w-md">
      {/* Heading */}
      <div className="mb-7">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Welcome back
        </p>

        <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          Sign in to Golden Crumbs
        </h2>

        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          Access your saved baskets, recurring deliveries, and artisanal
          orders.
        </p>
      </div>

      {/* Google */}
      <div className="overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-sm">
        <GoogleLogin
         
        />
      </div>

     

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />

        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          or continue with email
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>

      

      <form
        onSubmit={handleSubmit()}
        className="space-y-5 flex flex-col gap-3"
        noValidate
      
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-semibold text-foreground"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email address",
              },
            })}
            className={`h-12 w-full rounded-xl border bg-input px-4 text-sm text-foreground
              placeholder:text-muted-foreground/60
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-ring/20
              ${
                errors.email
                  ? "border-red-400"
                  : "border-border focus:border-ring"
              }`}
          />

          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-foreground"
            >
              Password
            </label>

            <button
              type="button"
            
              className="text-xs font-medium text-primary transition-colors hover:text-primary/70 disabled:opacity-50"
            >
             Forgot password
            </button>
          </div>

          <input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
            })}
            className={`h-12 w-full rounded-xl border bg-input px-4 text-sm text-foreground
              placeholder:text-muted-foreground/50
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-ring/20
              ${
                errors.password
                  ? "border-red-400"
                  : "border-border focus:border-ring"
              }`}
          />

          {errors.password && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}

         
        </div>

        {/* Submit */}
        <button
          type="submit"
        
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl
            bg-primary px-5 text-sm font-semibold text-primary-foreground
            shadow-sm transition-all duration-200
            hover:-translate-y-0.5 hover:shadow-lg
            hover:brightness-105
            disabled:pointer-events-none disabled:opacity-60"
        >
         Sign in 

         
        </button>
      </form>

      {/* Register */}
      <p className="mt-7 text-center text-sm text-muted-foreground">
        New customer at Golden Crumbs?{" "}
        <a
          href="/register"
          className="font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Create an account
        </a>
      </p>
    </div>
  );
}