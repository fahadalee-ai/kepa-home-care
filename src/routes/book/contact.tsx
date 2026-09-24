import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { BookFrame } from "@/components/BookFrame";
import { RequireAuth } from "@/components/RequireAuth";
import { Button, Field, Input } from "@/components/kit";
import { BUSINESS, type ContactMethod } from "@/lib/mock-data";
import { emailError, formatPhone, phoneError, required } from "@/lib/validation";
import { useFormValidation } from "@/lib/useFormValidation";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book/contact")({
  head: () => ({ meta: [{ title: "Contact — KEPA Home Care" }] }),
  component: () => (
    <RequireAuth>
      <ContactStep />
    </RequireAuth>
  ),
});

function ContactStep() {
  const navigate = useNavigate();
  const { user, draft, updateDraft } = useApp();
  const form = useFormValidation(
    {
      name: draft.name || user?.name || "",
      phone: draft.phone || user?.phone || "",
      email: draft.email || user?.email || "",
      contactMethod: draft.contactMethod || user?.preferredContact || "phone",
    },
    (v) => ({
      name: required(v.name, "Full name"),
      phone: phoneError(v.phone),
      email: emailError(v.email),
    }),
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.submit()) return;
    updateDraft({
      name: form.values.name,
      phone: form.values.phone,
      email: form.values.email,
      contactMethod: form.values.contactMethod as ContactMethod,
    });
    navigate({ to: "/book/review" });
  }

  return (
    <BookFrame step={4}>
      <form onSubmit={onSubmit}>
        <Field label="Full name" error={form.errors.name}>
          <Input value={form.values.name} onChange={(e) => form.set("name", e.target.value)} />
        </Field>
        <Field label="Phone number" error={form.errors.phone}>
          <Input
            type="tel"
            value={form.values.phone}
            onChange={(e) => form.set("phone", formatPhone(e.target.value))}
          />
        </Field>
        <Field label="Email address" error={form.errors.email}>
          <Input type="email" value={form.values.email} onChange={(e) => form.set("email", e.target.value)} />
        </Field>
        <p className="mb-2 text-sm font-medium">Preferred contact method</p>
        <div className="mb-4 grid grid-cols-3 gap-2">
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
              onClick={() => form.set("contactMethod", id)}
              className={cn(
                "min-h-11 rounded-2xl border text-sm font-semibold",
                form.values.contactMethod === id ? "border-primary bg-primary text-white" : "border-border bg-white",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mb-5 rounded-2xl bg-white p-4 text-sm leading-5 text-muted-foreground">
          {BUSINESS.officeLine}
        </div>
        <Button type="submit" full>
          Continue
        </Button>
      </form>
    </BookFrame>
  );
}
