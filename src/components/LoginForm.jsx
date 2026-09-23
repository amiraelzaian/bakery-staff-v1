import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useAuth";

import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export default function LoginForm() {

  const[open,setOpen]=useState(false)

  const { login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formData) => {
    login(formData);
  };

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
         Access your based-role dashboared, Monitor your work, Keep fresh
        </p>
      </div>

      

      

      <form
        onSubmit={handleSubmit(onSubmit)}
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

  <div className="relative">
    <input
      id="password"
      type={open ? "text" : "password"}
      placeholder="••••••••"
      autoComplete="current-password"
      {...register("password", {
        required: "Password is required",
      })}
      className={`h-12 w-full rounded-xl border bg-input pl-4 pr-11 text-sm text-foreground
        placeholder:text-muted-foreground/50
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-ring/20
        ${
          errors.password
            ? "border-red-400"
            : "border-border focus:border-ring"
        }`}
    />

    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
    >
      {open ? <Eye size={18} /> : <EyeClosed size={18} />}
    </button>
  </div>

  {errors.password && (
    <p className="mt-1.5 text-xs text-red-600">
      {errors.password.message}
    </p>
  )}
</div>

        {/* Login error */}
        {error && (
          <p className="text-center text-sm text-red-600">
            {error.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl
            bg-primary px-5 text-sm font-semibold text-primary-foreground
            shadow-sm transition-all duration-200
            hover:-translate-y-0.5 hover:shadow-lg
            hover:brightness-105
            disabled:pointer-events-none disabled:opacity-60"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>

     
      <p className="mt-7 text-center text-sm text-muted-foreground">
        If you have any question, Ask your manager
      </p>
    </div>
  );
}