import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button, Field, Header, Input, Screen, Textarea } from "@/components/kit";
import { BUSINESS } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { emailError, phoneError, required } from "@/lib/validation";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Us — KEPA Home Care" }] }),
  component: ContactScreen,
});

function ContactScreen() {
  const { pushToast } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [news, setNews] = useState("");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  function send(e: FormEvent) {
    e.preventDefault();
    const next = {
      name: required(name, "Name"),
      email: emailError(email),
      phone: phoneError(phone),
      message: required(message, "Message"),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    pushToast("Message sent", "Our care team will be in touch.");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  }

  function subscribe(e: FormEvent) {
    e.preventDefault();
    if (emailError(news)) {
      pushToast("Enter a valid email");
      return;
    }
    pushToast("Subscribed", "You'll hear from KEPA Home Care.");
    setNews("");
  }

  return (
    <Screen padded={false} className="pb-10">
      <Header title="Contact Us" fallbackTo="/profile" />
      <div className="px-4">
        <article className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="font-semibold">{BUSINESS.fullAddress}</p>
          <a href={BUSINESS.phoneHref} className="mt-2 block font-semibold text-primary">
            {BUSINESS.phone}
          </a>
          <a href={BUSINESS.altPhoneHref} className="mt-1 block font-semibold text-primary">
            {BUSINESS.altPhone}
          </a>
          <p className="mt-2 text-sm text-muted-foreground">Office Hours: {BUSINESS.hours}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a href={BUSINESS.phoneHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-white">
              <Phone size={16} /> Call
            </a>
            <a href={BUSINESS.mapsHref} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-border text-sm font-semibold">
              <MapPin size={16} /> Maps
            </a>
          </div>
        </article>

        <form onSubmit={send} className="mt-5" noValidate>
          <Field label="Name" error={errors.name}>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Email" error={errors.email}>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Phone" error={errors.phone}>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Field>
          <Field label="Message" error={errors.message}>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
          </Field>
          <Button type="submit" full>
            Send Message
          </Button>
        </form>

        <form onSubmit={subscribe} className="mt-8 rounded-2xl bg-black p-4 text-white">
          <h2 className="font-display text-lg font-bold">Stay up to date with our latest news and products</h2>
          <Input
            type="email"
            placeholder="Email address"
            value={news}
            onChange={(e) => setNews(e.target.value)}
            className="mt-3 bg-white text-black"
          />
          <Button type="submit" full className="mt-3">
            Subscribe
          </Button>
        </form>
      </div>
    </Screen>
  );
}
