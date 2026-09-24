import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PasswordField } from "@/components/AuthShell";
import { Button, Field, Header, Input } from "@/components/kit";
import { Checkbox } from "@/components/ui/checkbox";
import type { CareRole, ContactMethod } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { formatPhone } from "@/lib/validation";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create Account — KEPA Home Care" }] }),
  component: RegisterScreen,
});

function RegisterScreen() {
  const navigate = useNavigate();
  const { register, completeVerification } = useApp();
  const [step, setStep] = useState<"account" | "profile">("account");
  const [emailSaved, setEmailSaved] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<CareRole>("patient");
  const [terms, setTerms] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [contact, setContact] = useState<ContactMethod>("phone");

  function enterHome(savedEmail: string) {
    completeVerification(savedEmail);
    navigate({ to: "/home" });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const result = register({ name, email, phone, password, dob, role });
    if (!result.ok) return;
    setEmailSaved(result.email);
    setStep("profile");
  }

  function saveProfile(e: FormEvent) {
    e.preventDefault();
    completeVerification(emailSaved, {
      address,
      city,
      state: "MA",
      zip,
      preferredContact: contact,
    });
    navigate({ to: "/home" });
  }

  if (step === "profile") {
    return (
      <div className="min-h-dvh bg-background pb-8">
        <Header title="Your Address" fallbackTo="/register" />
        <div className="px-4 pt-4">
        <p className="font-display text-[13px] font-semibold tracking-[0.16em] text-primary uppercase">Optional</p>
        <h1 className="mt-2 font-display text-[28px] font-bold">Your home address</h1>
        <p className="mt-2 text-sm text-muted-foreground">Help us match you with care in Massachusetts.</p>
        <form onSubmit={saveProfile} className="mt-6">
          <Field label="Address">
            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          </Field>
          <Field label="City">
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="State">
              <Input value="MA" readOnly />
            </Field>
            <Field label="ZIP">
              <Input value={zip} onChange={(e) => setZip(e.target.value)} />
            </Field>
          </div>
          <p className="mb-2 text-sm font-medium">Preferred contact method</p>
          <div className="mb-5 grid grid-cols-3 gap-2">
            {(
              [
                ["phone", "Phone"],
                ["email", "Email"],
                ["text", "Text"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setContact(id)}
                className={cn(
                  "min-h-11 rounded-2xl border text-sm font-semibold",
                  contact === id ? "border-primary bg-primary text-white" : "border-border bg-white",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <Button type="submit" full>
            Save and continue
          </Button>
          <button type="button" onClick={() => enterHome(emailSaved)} className="mt-3 min-h-11 w-full text-[17px] font-semibold text-primary">
            Skip for now
          </button>
        </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background pb-8">
      <Header title="Create Account" fallbackTo="/onboarding" />
      <div className="px-4 pt-4">
      <h1 className="font-display text-[22px] leading-7 font-bold">Create Your Account</h1>
      <p className="mt-2 text-sm text-muted-foreground">Join KEPA Home Care to book and manage in-home visits.</p>
      <form onSubmit={onSubmit} className="mt-6" noValidate>
        <Field label="Full Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Email Address">
          <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Phone Number">
          <Input type="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} />
        </Field>
        <Field label="Date of Birth">
          <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </Field>
        <PasswordField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <PasswordField label="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <p className="mb-2 text-sm font-medium">I am a</p>
        <div className="mb-4 grid grid-cols-2 gap-2">
          {(
            [
              ["patient", "Patient"],
              ["family", "Family Member / Caregiver"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setRole(id)}
              className={cn(
                "min-h-11 rounded-2xl border px-2 text-sm font-semibold",
                role === id ? "border-primary bg-primary text-white" : "border-border bg-white",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="mb-4 flex items-start gap-3 text-sm">
          <Checkbox checked={terms} onCheckedChange={(v) => setTerms(v === true)} className="mt-0.5" />
          <span>
            I agree to the{" "}
            <Link to="/terms" className="font-semibold text-primary">
              Terms of Service
            </Link>{" "}
            &{" "}
            <Link to="/privacy" className="font-semibold text-primary">
              Privacy Policy
            </Link>
          </span>
        </label>
        <Button type="submit" full>
          Create Account
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary">
          Log In
        </Link>
      </p>
      </div>
    </div>
  );
}
