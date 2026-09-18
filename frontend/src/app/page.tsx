"use client";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { chain } from "./chain";
import { client } from "./client";
import UserStatus from "../../components/UserStatus";
import Footer from "../../components/Footer";
import { Twitter } from "lucide-react";

const Home = () => {
  const account = useActiveAccount();

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="sticky top-0 z-50 bg-black border-b border-[#2f3336] px-4 py-3">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-[30px] text-[#1d9bf0] font-bold">Twitter</h1>
            <Twitter size={32} color="#1d9bf0" />
          </div>
          {account && <ConnectButton chain={chain} client={client} />}
        </div>
      </nav>
      <main className="max-w-[1200px] mx-auto mt-8 px-4">
        <UserStatus />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
