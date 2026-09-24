import { Outlet, createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { CalendarDays, ChevronRight, Info, LogOut, Mail, MapPin, MessageCircle, Phone, UserRound } from "lucide-react";
import { useState, type ReactNode } from "react";
import { ConfirmDialog, Header, Screen } from "@/components/kit";
import { BUSINESS, initials, roleLabel } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — KEPA Home Care" }] }),
  component: ProfileRoute,
});

function ProfileRoute() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/profile") return <Outlet />;
  return <ProfileScreen />;
}

function ProfileScreen() {
  const navigate = useNavigate();
  const { user, logout } = useApp();
  const [confirmOut, setConfirmOut] = useState(false);
  const place = [user?.city, user?.state].filter(Boolean).join(", ");

  return (
    <Screen padded={false} className="pb-10">
      <Header large back={false} title="Profile" />

      {user ? (
        <section className="mx-4 mt-2 overflow-hidden rounded-[22px] bg-black text-white shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-4 p-5">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xl font-bold">
              {initials(user.name)}
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-[22px] leading-7 font-bold">{user.name}</p>
              {roleLabel(user.role) && (
                <p className="mt-1 inline-flex rounded-full bg-white/10 px-2.5 py-1 text-[12px] font-medium text-white/90">
                  {roleLabel(user.role)}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2 border-t border-white/10 px-5 py-4 text-[15px] text-white/80">
            <p className="flex items-center gap-2 truncate">
              <Mail size={16} className="shrink-0 text-primary" />
              {user.email}
            </p>
            {user.phone && (
              <p className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-primary" />
                {user.phone}
              </p>
            )}
            {place && (
              <p className="flex items-center gap-2">
                <MapPin size={16} className="shrink-0 text-primary" />
                {place}
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="mx-4 mt-2 rounded-[22px] bg-white p-5 text-center shadow-[0_10px_28px_rgba(0,0,0,0.05)]">
          <p className="font-display text-xl font-bold">Your care account</p>
          <p className="mt-2 text-[15px] leading-[22px] text-muted-foreground">
            Log in to manage appointments and your care plan.
          </p>
          <Link
            to="/login"
            className="mt-4 inline-flex min-h-[50px] w-full items-center justify-center rounded-2xl bg-primary text-[17px] font-semibold text-white"
          >
            Log In
          </Link>
        </section>
      )}

      <Group label="Care">
        <MenuLink to="/appointments" icon={<CalendarDays size={18} />} label="My Appointments" detail="Upcoming and past visits" />
        <MenuLink to="/chat" icon={<MessageCircle size={18} />} label="Chat" detail="Message the KEPA care team" />
      </Group>

      <Group label="Account">
        <MenuLink to="/profile/edit" icon={<UserRound size={18} />} label="Account Details" detail="Name, contact, and address" />
      </Group>

      <Group label="KEPA">
        <MenuLink to="/contact" icon={<Phone size={18} />} label="Contact Us" detail={BUSINESS.hours} />
        <MenuLink to="/about" icon={<Info size={18} />} label="About Us" detail="Our care team" />
      </Group>

      <a
        href={BUSINESS.phoneHref}
        className="mx-4 mt-6 flex items-center justify-between rounded-[20px] bg-white px-4 py-4 shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
      >
        <span>
          <span className="block text-[13px] text-muted-foreground">Care team</span>
          <span className="block text-[17px] font-semibold">Call {BUSINESS.phone}</span>
        </span>
        <span className="flex size-11 items-center justify-center rounded-full bg-[#E8F0FE] text-primary">
          <Phone size={18} />
        </span>
      </a>

      {user && (
        <button
          type="button"
          onClick={() => setConfirmOut(true)}
          className="mx-auto mt-6 flex min-h-11 items-center gap-2 px-4 text-[17px] font-semibold text-danger"
        >
          <LogOut size={18} />
          Log Out
        </button>
      )}

      <ConfirmDialog
        open={confirmOut}
        title="Log out?"
        body="You'll need to sign in again to book or manage appointments."
        confirmLabel="Log out"
        danger
        onClose={() => setConfirmOut(false)}
        onConfirm={() => {
          logout();
          setConfirmOut(false);
          navigate({ to: "/login" });
        }}
      />
    </Screen>
  );
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mt-6 px-4">
      <p className="mb-2 px-1 font-display text-[13px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </p>
      <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.04)]">{children}</div>
    </section>
  );
}

function MenuLink({
  to,
  icon,
  label,
  detail,
}: {
  to: "/appointments" | "/chat" | "/profile/edit" | "/contact" | "/about";
  icon: ReactNode;
  label: string;
  detail: string;
}) {
  return (
    <Link to={to} className="flex min-h-[60px] items-center gap-3 border-b border-black/5 px-4 py-3 last:border-0">
      <span className="flex size-10 items-center justify-center rounded-full bg-[#E8F0FE] text-primary">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[17px] leading-[22px] font-semibold">{label}</span>
        <span className="block truncate text-[13px] leading-[18px] text-muted-foreground">{detail}</span>
      </span>
      <ChevronRight size={18} className="text-muted-foreground" />
    </Link>
  );
}
