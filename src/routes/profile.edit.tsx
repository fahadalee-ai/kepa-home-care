import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { Button, Header, Screen, TextInputField } from "@/components/kit";
import { RequireAuth } from "@/components/RequireAuth";
import { emailError, formatPhone, phoneError, required } from "@/lib/validation";
import { useFormValidation } from "@/lib/useFormValidation";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/profile/edit")({
  head: () => ({ meta: [{ title: "Account details — KEPA Home Care" }] }),
  component: () => (
    <RequireAuth>
      <EditProfileScreen />
    </RequireAuth>
  ),
});

function EditProfileScreen() {
  const navigate = useNavigate();
  const { user, updateUser, pushToast } = useApp();
  const form = useFormValidation(
    {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
      city: user?.city ?? "",
      zip: user?.zip ?? "",
    },
    (v) => ({
      name: required(v.name, "Name"),
      email: emailError(v.email),
      phone: phoneError(v.phone),
    }),
  );

  function save(e: FormEvent) {
    e.preventDefault();
    if (!form.submit()) return;
    updateUser({
      name: form.values.name,
      email: form.values.email,
      phone: form.values.phone,
      address: form.values.address,
      city: form.values.city,
      state: "MA",
      zip: form.values.zip,
    });
    pushToast("Account updated");
    navigate({ to: "/profile" });
  }

  return (
    <Screen padded={false} className="pb-8">
      <Header title="Account Details" fallbackTo="/profile" />
      <form className="px-4" onSubmit={save}>
        <TextInputField label="Full name" value={form.values.name} onChange={(e) => form.set("name", e.target.value)} error={form.errors.name} />
        <TextInputField label="Email" type="email" value={form.values.email} onChange={(e) => form.set("email", e.target.value)} error={form.errors.email} />
        <TextInputField label="Phone" type="tel" value={form.values.phone} onChange={(e) => form.set("phone", formatPhone(e.target.value))} error={form.errors.phone} />
        <TextInputField label="Address" value={form.values.address} onChange={(e) => form.set("address", e.target.value)} />
        <TextInputField label="City" value={form.values.city} onChange={(e) => form.set("city", e.target.value)} />
        <TextInputField label="ZIP" value={form.values.zip} onChange={(e) => form.set("zip", e.target.value)} />
        <Button type="submit" full>
          Save changes
        </Button>
      </form>
    </Screen>
  );
}
