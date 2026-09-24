import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PasswordField } from "@/components/AuthShell";
import { TextLogo } from "@/components/TextLogo";
import { Button, Field, Header, Input } from "@/components/kit";
import { useApp } from "@/lib/store";

type Search = { next?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    next: typeof s.next === "string" ? s.next : undefined,
  }),
  head: () => ({ meta: [{ title: "Log In — KEPA Home Care" }] }),
  component: LoginScreen,
});

function LoginScreen() {
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function finish() {
    if (next?.startsWith("/")) navigate({ to: next as "/home" });
    else navigate({ to: "/home" });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    login(email, password);
    finish();
  }

  return (
    <div className="min-h-dvh bg-background pb-8">
      <Header title="Log In" fallbackTo="/onboarding" />
      <div className="px-4 pt-4">
      <TextLogo size="md" />
      <h1 className="mt-6 text-center font-display text-[28px] font-bold">Welcome Back</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Log in to manage your appointments and care plan.
      </p>
      <form onSubmit={onSubmit} className="mt-6" noValidate>
        <Field label="Email Address">
          <Input type="text" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <PasswordField
          label="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="-mt-1 mb-5 flex justify-end">
          <Link to="/forgot-password" className="min-h-11 text-sm font-semibold text-primary">
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" full>
          Log In
        </Button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs tracking-wide text-muted-foreground uppercase">
        <span className="h-px flex-1 bg-border" />
        or continue with
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            login("maria@example.com", "Care1234");
            finish();
          }}
        >
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            login("maria@example.com", "Care1234");
            finish();
          }}
        >
          Apple
        </Button>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="font-semibold text-primary">
          Sign Up
        </Link>
      </p>
      </div>
    </div>
  );
}
