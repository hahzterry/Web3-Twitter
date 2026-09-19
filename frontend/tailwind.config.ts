// frontend/tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;


// frontend/src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web3 Twitter - Tweet your next thought",
  description: "A decentralized social platform for posting and sharing your thoughts.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}


// frontend/src/app/page.tsx

"use client";

import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { chain } from "./chain";
import { client } from "./client";
import UserStatus from "../../components/UserStatus";
import Footer from "../../components/Footer";
import { Twitter } from "lucide-react";

export default function Home() {
  const account = useActiveAccount();

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-black text-white">
      <nav className="sticky top-0 z-50 border-b border-[#2f3336] bg-black/95 px-3 py-2 backdrop-blur-md sm:px-4 sm:py-3">
        <div className="mx-auto flex h-11 w-full max-w-[1200px] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Twitter
              size={25}
              strokeWidth={2.5}
              color="#1d9bf0"
              className="shrink-0 sm:h-7 sm:w-7"
            />
            <h1 className="truncate text-[20px] font-bold text-[#1d9bf0] sm:text-[26px]">
              Web3 Twitter
            </h1>
          </div>

          {account && (
            <div className="shrink-0">
              <ConnectButton
                chain={chain}
                client={client}
                connectButton={{
                  label: "Connect",
                }}
              />
            </div>
          )}
        </div>
      </nav>

      <main className="mx-auto w-full max-w-[1200px]">
        <UserStatus />
      </main>

      <Footer />
    </div>
  );
}


// frontend/src/app/globals.css

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #000000;
  --foreground: #ededed;
  --twitter-blue: #1d9bf0;
  --twitter-border: #2f3336;
  --twitter-muted: #71767b;
  --twitter-card: #16181c;
}

@media (prefers-color-scheme: light) {
  :root {
    --background: #000000;
    --foreground: #ededed;
  }
}

html {
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  background: #000000;
  color-scheme: dark;
  scroll-behavior: smooth;
}

body {
  width: 100%;
  max-width: 100%;
  min-height: 100dvh;
  margin: 0;
  overflow-x: clip;
  background: #000000;
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

button,
input,
textarea {
  font: inherit;
}

button {
  -webkit-tap-highlight-color: transparent;
}

input,
textarea {
  min-width: 0;
}

a {
  color: inherit;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

img,
svg,
video {
  max-width: 100%;
}

::selection {
  background: rgba(29, 155, 240, 0.35);
}

[data-thirdweb-modal],
[role="dialog"] {
  z-index: 9999 !important;
}

body > div[data-thirdweb-modal] {
  position: fixed !important;
  inset: 0 !important;
}

body {
  transform: none !important;
  filter: none !important;
  perspective: none !important;
  will-change: auto !important;
}

@media (max-width: 767px) {
  html {
    overflow-x: clip;
  }

  body {
    overflow-x: clip;
    padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 64px);
  }

  textarea {
    font-size: 16px !important;
  }

  input {
    font-size: 16px !important;
  }
}

@media (min-width: 768px) {
  .mobile-only {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .desktop-only {
    display: none !important;
  }
}


// frontend/components/MobileBottomNav.tsx

"use client";

import {
  Bell,
  Home,
  Mail,
  MoreHorizontal,
  Search,
  User,
  Users,
} from "lucide-react";

type MobileBottomNavProps = {
  active?: string;
};

const items = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Explore" },
  { icon: Bell, label: "Notifications" },
  { icon: Mail, label: "Messages" },
  { icon: Users, label: "Communities" },
  { icon: User, label: "Profile" },
  { icon: MoreHorizontal, label: "More" },
];

export default function MobileBottomNav({
  active = "Home",
}: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Mobile navigation"
      className="mobile-only fixed inset-x-0 bottom-0 z-[100] border-t border-[#2f3336] bg-black/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
        {items.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = active === item.label;

          return (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-w-[52px] flex-col items-center justify-center gap-1 rounded-full px-2 py-2 transition ${
                isActive
                  ? "text-white"
                  : "text-[#71767b] active:bg-[#181818]"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="sr-only">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}


// frontend/components/Footer.tsx

import React from "react";

const Footer = () => {
  return (
    <footer className="desktop-only border-t border-[#1f2937] bg-black">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-5 text-sm">
        <span className="text-[#71717a]">
          x.3wordpin.com — Pin your thoughts
        </span>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#a1a1aa]">
          <a
            href="https://x.com/3WordPin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00b8ff] transition hover:text-white"
          >
            X: @3WordPin
          </a>

          <a
            href="https://tiktok.com/@3WordPin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00b8ff] transition hover:text-white"
          >
            TikTok: @3WordPin
          </a>

          <a
            href="https://instagram.com/3WordPin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00b8ff] transition hover:text-white"
          >
            Instagram: @3WordPin
          </a>

          <a href="#" className="transition hover:text-white">
            Terms
          </a>

          <a href="#" className="transition hover:text-white">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


// frontend/components/UserStatus.tsx

"use client";

import React, { useState } from "react";
import {
  ConnectEmbed,
  TransactionButton,
  useActiveAccount,
  useContractEvents,
  useReadContract,
} from "thirdweb/react";
import {
  ArrowRight,
  BarChart2,
  Bell,
  Bookmark,
  Calendar,
  Clock,
  EyeOff,
  Film,
  Globe,
  Heart,
  Home,
  Image,
  KeyRound,
  Mail,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Search,
  Share,
  ShieldCheck,
  Smile,
  User,
  Users,
  Wallet,
  X as XIcon,
} from "lucide-react";
import { prepareContractCall } from "thirdweb";
import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { contract } from "../utils/contract";
import MobileBottomNav from "./MobileBottomNav";

const MAX_STATUS_LENGTH = 140;

const navigationItems = [
  { icon: Home, text: "Home" },
  { icon: Search, text: "Explore" },
  { icon: Bell, text: "Notifications" },
  { icon: Mail, text: "Messages" },
  { icon: Users, text: "Communities" },
  { icon: User, text: "Profile" },
  { icon: MoreHorizontal, text: "More" },
];

const features = [
  {
    Icon: EyeOff,
    title: "No More Shadowbans",
    description:
      "Your posts can't be quietly hidden or downranked by an algorithm you don't control.",
  },
  {
    Icon: KeyRound,
    title: "You Own Your Account",
    description:
      "No one can lock you out, ban you unfairly, or sell your data without your say.",
  },
  {
    Icon: ShieldCheck,
    title: "Posts That Can't Be Deleted",
    description:
      "Unlike Twitter, no one — not even us — can erase what you've published.",
  },
  {
    Icon: Wallet,
    title: "Get Paid Directly",
    description:
      "Earn from your posts instantly. No middlemen, no 30-day payout delays.",
  },
];

const trendingTopics = [
  "3WordPin",
  "FreeSpeech",
  "OwnYourVoice",
  "NoShadowbans",
];

export default function UserStatus() {
  const account = useActiveAccount();
  const address = account?.address as string | undefined;

  const [newStatus, setNewStatus] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const { data: contractEvents } = useContractEvents({
    contract,
  });

  useReadContract({
    contract,
    method: "getStatus",
    params: [address ?? "0x0000000000000000000000000000000000000000"],
  });

  const truncateWalletAddress = (walletAddress: string) => {
    if (!walletAddress) return "";
    return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
  };

  const convertDate = (timestamp: bigint | undefined) => {
    if (!timestamp) return "";
    return new Date(Number(timestamp) * 1000).toLocaleString();
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value.slice(0, MAX_STATUS_LENGTH);
    setNewStatus(value);
    setCharCount(value.length);
  };

  if (!account) {
    return (
      <div className="min-h-[calc(100dvh-60px)] bg-black px-4 py-8 text-white sm:px-6 sm:py-12 lg:px-10">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 lg:min-h-[calc(100dvh-120px)] lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="w-full max-w-[650px]">
            <div className="mb-8 flex items-center gap-3 sm:mb-10">
              <XIcon
                size={32}
                strokeWidth={2.5}
                color="#1d9bf0"
                className="shrink-0 sm:h-10 sm:w-10"
              />

              <span className="text-xl font-bold text-[#1d9bf0] sm:text-2xl">
                x.3wordpin.com
              </span>
            </div>

            <h1 className="max-w-[650px] text-[42px] font-bold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl lg:text-[64px]">
              Social, minus the middlemen.
            </h1>

            <p className="mt-5 max-w-[600px] text-lg leading-7 text-[#e7e9ea] sm:mt-6 sm:text-xl md:text-2xl md:leading-9">
              No shadowbans. No silent edits. No locked accounts. Just your
              posts, owned by you.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.Icon;
                const hovered = hoveredFeature === index;

                return (
                  <div
                    key={feature.title}
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className={`rounded-2xl border border-[#2f3336] p-4 transition sm:p-5 ${
                      hovered ? "bg-[#16181c]" : "bg-transparent"
                    }`}
                  >
                    <IconComponent
                      size={24}
                      color="#1d9bf0"
                      className={`mb-3 transition sm:mb-4 ${
                        hovered ? "scale-110" : ""
                      }`}
                    />

                    <h3
                      className={`mb-2 text-base font-bold transition sm:text-[17px] ${
                        hovered ? "text-[#1d9bf0]" : "text-white"
                      }`}
                    >
                      {feature.title}
                    </h3>

                    <p className="text-sm leading-6 text-[#71767b]">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full max-w-[430px] self-center lg:self-auto">
            <div className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-5 shadow-2xl sm:p-7 md:p-8">
              <h2 className="text-xl font-bold sm:text-2xl">
                Join the conversation
              </h2>

              <p className="mt-1 text-sm text-[#71767b]">
                One click. No email required.
              </p>

              <div className="mt-5 w-full overflow-hidden rounded-xl">
                <ConnectEmbed chain={chain} client={client} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-[calc(100dvh-60px)] w-full flex-col bg-black text-white md:flex-row">
        <aside className="desktop-only sticky top-[60px] hidden h-[calc(100dvh-60px)] w-[275px] shrink-0 flex-col border-r border-[#2f3336] px-5 py-5 lg:flex">
          <div className="mb-8 px-3">
            <span className="text-xl font-bold text-[#1d9bf0]">
              x.3wordpin.com
            </span>
          </div>

          <nav className="flex-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = item.text === "Home";

              return (
                <button
                  key={item.text}
                  type="button"
                  className={`mb-1 flex w-full items-center gap-5 rounded-full px-3 py-3 text-left text-xl transition ${
                    active
                      ? "font-bold text-white"
                      : "text-white hover:bg-[#181818]"
                  }`}
                >
                  <Icon size={24} strokeWidth={active ? 2.5 : 2} />
                  <span>{item.text}</span>
                </button>
              );
            })}
          </nav>

          <div className="border-t border-[#2f3336] px-3 pt-4 text-xs text-[#71767b]">
            Signed in as
            <div className="mt-1 font-medium text-[#1d9bf0]">
              {truncateWalletAddress(address ?? "")}
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 border-[#2f3336] md:max-w-[600px] md:border-r">
          <div className="border-b border-[#2f3336] px-4 py-3 sm:px-5 sm:py-4">
            <div className="text-lg font-bold sm:text-xl">Home</div>

            <textarea
              aria-label="What's happening?"
              placeholder="What's happening?!"
              value={newStatus}
              onChange={handleStatusChange}
              rows={3}
              maxLength={MAX_STATUS_LENGTH}
              className="mt-4 min-h-[88px] w-full resize-none bg-transparent text-[18px] leading-7 text-white outline-none placeholder:text-[#71767b] sm:text-xl"
            />

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#2f3336] pt-3">
              <div className="flex min-w-0 items-center gap-4 overflow-hidden text-[#1d9bf0]">
                <button
                  type="button"
                  aria-label="Add image"
                  className="shrink-0 rounded-full p-1.5 hover:bg-[#1d9bf0]/10"
                >
                  <Image size={19} />
                </button>

                <button
                  type="button"
                  aria-label="Add video"
                  className="shrink-0 rounded-full p-1.5 hover:bg-[#1d9bf0]/10"
                >
                  <Film size={19} />
                </button>

                <button
                  type="button"
                  aria-label="Add poll"
                  className="hidden shrink-0 rounded-full p-1.5 hover:bg-[#1d9bf0]/10 xs:block"
                >
                  <BarChart2 size={19} />
                </button>

                <button
                  type="button"
                  aria-label="Add emoji"
                  className="shrink-0 rounded-full p-1.5 hover:bg-[#1d9bf0]/10"
                >
                  <Smile size={19} />
                </button>

                <button
                  type="button"
                  aria-label="Schedule post"
                  className="hidden shrink-0 rounded-full p-1.5 hover:bg-[#1d9bf0]/10 sm:block"
                >
                  <Calendar size={19} />
                </button>

                <button
                  type="button"
                  aria-label="Add location"
                  className="hidden shrink-0 rounded-full p-1.5 hover:bg-[#1d9bf0]/10 sm:block"
                >
                  <MapPin size={19} />
                </button>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <span
                  className={`text-xs font-medium sm:text-sm ${
                    charCount > MAX_STATUS_LENGTH
                      ? "text-[#f4212e]"
                      : charCount > 120
                        ? "text-yellow-500"
                        : "text-[#1d9bf0]"
                  }`}
                >
                  {MAX_STATUS_LENGTH - charCount}
                </span>

                <TransactionButton
                  transaction={() =>
                    prepareContractCall({
                      contract,
                      method: "setStatus",
                      params: [newStatus],
                    })
                  }
                  onTransactionConfirmed={() => {
                    alert("Posted!");
                    setNewStatus("");
                    setCharCount(0);
                  }}
                  disabled={
                    !newStatus.trim() || charCount > MAX_STATUS_LENGTH
                  }
                  className="!rounded-full !bg-[#1d9bf0] !px-4 !py-2 !text-sm !font-bold !text-white disabled:!cursor-not-allowed disabled:!opacity-50 sm:!px-5"
                >
                  Post
                </TransactionButton>
              </div>
            </div>
          </div>

          <div>
            {contractEvents && contractEvents.length > 0 ? (
              [...contractEvents].reverse().map((event, index) => {
                const eventArgs = event.args as
                  | {
                      user?: string;
                      newStatus?: string;
                      timestamp?: bigint;
                    }
                  | undefined;

                return (
                  <article
                    key={index}
                    className="border-b border-[#2f3336] px-4 py-4 sm:px-5 sm:py-5"
                  >
                    <div className="mb-2 flex min-w-0 items-center justify-between">
                      <span className="truncate text-sm font-medium text-[#1d9bf0] sm:text-base">
                        {truncateWalletAddress(eventArgs?.user ?? "0x0000")}
                      </span>
                    </div>

                    <p className="break-words text-[15px] leading-6 text-white sm:text-base">
                      {eventArgs?.newStatus || "No message provided."}
                    </p>

                    <div className="mt-4 flex w-full items-center justify-between text-[#71767b] sm:max-w-[85%]">
                      <button
                        type="button"
                        aria-label="Reply"
                        className="rounded-full p-2 hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0]"
                      >
                        <MessageCircle size={18} />
                      </button>

                      <button
                        type="button"
                        aria-label="Repost"
                        className="rounded-full p-2 hover:bg-green-500/10 hover:text-green-500"
                      >
                        <Repeat2 size={18} />
                      </button>

                      <button
                        type="button"
                        aria-label="Like"
                        className="rounded-full p-2 hover:bg-pink-500/10 hover:text-pink-500"
                      >
                        <Heart size={18} />
                      </button>

                      <button
                        type="button"
                        aria-label="Share"
                        className="rounded-full p-2 hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0]"
                      >
                        <Share size={18} />
                      </button>

                      <button
                        type="button"
                        aria-label="Bookmark"
                        className="rounded-full p-2 hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0]"
                      >
                        <Bookmark size={18} />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center gap-1 text-xs text-[#71767b] sm:text-sm">
                      <Clock size={14} />
                      <span>
                        {convertDate(eventArgs?.timestamp)}
                      </span>
                    </div>
                  </article>
                );
              })
            ) : (
              <p className="px-4 py-8 text-center text-sm text-[#71767b]">
                No posts yet.
              </p>
            )}
          </div>
        </main>

        <aside className="desktop-only sticky top-[60px] hidden h-[calc(100dvh-60px)] w-[350px] shrink-0 overflow-y-auto px-5 py-5 xl:block">
          <div className="mb-4 flex items-center rounded-full bg-[#202327] px-5 py-3">
            <Search size={20} color="#71767b" />

            <input
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="ml-3 min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-[#71767b]"
            />
          </div>

          <div className="mb-4 rounded-2xl bg-[#16181c] p-4">
            <h2 className="mb-3 text-xl font-bold">
              Why people are switching
            </h2>

            <div className="text-sm leading-6 text-[#e7e9ea]">
              {[
                "No silent post deletions",
                "No arbitrary account bans",
                "No algorithm shadowbanning",
                "No 30-day payout holds",
              ].map((item) => (
                <div
                  key={item}
                  className="mb-2 flex items-start gap-2 last:mb-0"
                >
                  <ArrowRight
                    size={16}
                    color="#1d9bf0"
                    className="mt-1 shrink-0"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-4 w-full rounded-full bg-[#1d9bf0] px-4 py-2 font-bold text-white transition hover:bg-[#1a8cd8]"
            >
              Share your story
            </button>
          </div>

          <div className="rounded-2xl bg-[#16181c] p-4">
            <h2 className="mb-3 text-xl font-bold">What's happening</h2>

            {trendingTopics.map((topic, index) => (
              <div
                key={topic}
                className={`py-3 ${
                  index < trendingTopics.length - 1
                    ? "border-b border-[#2f3336]"
                    : ""
                }`}
              >
                <div className="text-xs text-[#71767b]">
                  Trending now
                </div>

                <div className="mt-1 font-bold">#{topic}</div>

                <div className="mt-1 text-xs text-[#71767b]">
                  {10 - index}K posts
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 px-4 py-2 text-sm leading-7 text-[#71767b]">
            <div className="mb-2 font-semibold text-white">Follow us</div>

            <a
              href="https://x.com/3WordPin"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#1d9bf0] hover:underline"
            >
              X: @3WordPin
            </a>

            <a
              href="https://tiktok.com/@3WordPin"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#1d9bf0] hover:underline"
            >
              TikTok: @3WordPin
            </a>

            <a
              href="https://instagram.com/3WordPin"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#1d9bf0] hover:underline"
            >
              Instagram: @3WordPin
            </a>

            <div className="mt-4 flex items-center gap-2 text-xs text-[#71767b]">
              <Globe size={13} />
              <span>Decentralized social publishing</span>
            </div>
          </div>
        </aside>
      </div>

      <MobileBottomNav active="Home" />
    </>
  );
}
