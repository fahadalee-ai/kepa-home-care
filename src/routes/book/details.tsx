import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { BookFrame } from "@/components/BookFrame";
import { RequireAuth } from "@/components/RequireAuth";
import { Button, Field, Input, Textarea } from "@/components/kit";
import { required } from "@/lib/validation";
import { useFormValidation } from "@/lib/useFormValidation";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book/details")({
  head: () => ({ meta: [{ title: "Patient details — KEPA Home Care" }] }),
  component: () => (
    <RequireAuth>
      <DetailsScreen />
    </RequireAuth>
  ),
});

function DetailsScreen() {
  const navigate = useNavigate();
  const { user, draft, updateDraft } = useApp();
  const form = useFormValidation(
    {
      bookingFor: draft.bookingFor,
      patientName: draft.patientName || user?.name || "",
      patientDob: draft.patientDob || user?.dob || "",
      address: draft.address || user?.address || "",
      city: draft.city || user?.city || "",
      state: draft.state || "MA",
      zip: draft.zip || user?.zip || "",
      medicalNotes: draft.medicalNotes,
      insurance: draft.insurance,
      selfPay: draft.selfPay ? "yes" : "no",
    },
    (v) => ({
      patientName: required(v.patientName, "Patient name"),
      patientDob: required(v.patientDob, "Date of birth"),
      address: required(v.address, "Address"),
      city: required(v.city, "City"),
      state: required(v.state, "State"),
      zip: v.zip.trim().length < 5 ? "Enter a valid ZIP" : undefined,
    }),
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.submit()) return;
    updateDraft({
      bookingFor: form.values.bookingFor === "someone" ? "someone" : "myself",
      patientName: form.values.patientName,
      patientDob: form.values.patientDob,
      address: form.values.address,
      city: form.values.city,
      state: form.values.state,
      zip: form.values.zip,
      medicalNotes: form.values.medicalNotes,
      insurance: form.values.selfPay === "yes" ? "" : form.values.insurance,
      selfPay: form.values.selfPay === "yes",
    });
    navigate({ to: "/book/datetime" });
  }

  return (
    <BookFrame step={2}>
      <form onSubmit={onSubmit}>
        <p className="mb-2 text-sm font-medium">Booking for</p>
        <div className="mb-4 grid grid-cols-2 gap-2">
          {(
            [
              ["myself", "Myself"],
              ["someone", "Someone Else"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => form.set("bookingFor", id)}
              className={cn(
                "min-h-11 rounded-2xl border text-sm font-semibold",
                form.values.bookingFor === id ? "border-primary bg-primary text-white" : "border-border bg-white",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <Field label="Patient full name" error={form.errors.patientName}>
          <Input value={form.values.patientName} onChange={(e) => form.set("patientName", e.target.value)} />
        </Field>
        <Field label="Date of birth" error={form.errors.patientDob}>
          <Input type="date" value={form.values.patientDob} onChange={(e) => form.set("patientDob", e.target.value)} />
        </Field>
        <Field label="Address" error={form.errors.address}>
          <Input value={form.values.address} onChange={(e) => form.set("address", e.target.value)} />
        </Field>
        <Field label="City" error={form.errors.city}>
          <Input value={form.values.city} onChange={(e) => form.set("city", e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="State" error={form.errors.state}>
            <Input value={form.values.state} onChange={(e) => form.set("state", e.target.value)} />
          </Field>
          <Field label="ZIP" error={form.errors.zip}>
            <Input inputMode="numeric" value={form.values.zip} onChange={(e) => form.set("zip", e.target.value)} />
          </Field>
        </div>
        <Field label="Relevant medical notes" hint="Optional">
          <Textarea value={form.values.medicalNotes} onChange={(e) => form.set("medicalNotes", e.target.value)} />
        </Field>
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-white px-3 py-3">
          <span className="text-sm font-medium">Self-pay</span>
          <button
            type="button"
            onClick={() => form.set("selfPay", form.values.selfPay === "yes" ? "no" : "yes")}
            className={cn(
              "min-h-9 rounded-full px-3 text-xs font-semibold",
              form.values.selfPay === "yes" ? "bg-primary text-white" : "bg-[#E8F0FE] text-primary",
            )}
          >
            {form.values.selfPay === "yes" ? "On" : "Off"}
          </button>
        </div>
        {form.values.selfPay !== "yes" && (
          <Field label="Insurance provider" hint="Optional">
            <Input value={form.values.insurance} onChange={(e) => form.set("insurance", e.target.value)} />
          </Field>
        )}
        <Button type="submit" full>
          Continue
        </Button>
      </form>
    </BookFrame>
  );
}
