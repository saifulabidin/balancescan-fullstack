import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./lib/utils";

const icons = {
  "Ethereum Sepolia": "/icons/eth.svg",
  "Arbitrum Sepolia": "/icons/arbm.svg",
  "Arbitrum Sepolia (BRN)": "/icons/brn.svg",
  "Base Sepolia": "/icons/bast.svg",
  "Optimism Sepolia": "/icons/opst.svg",
  "Blast Sepolia": "/icons/blst.svg",
  "Unichain Sepolia": "/icons/unit.svg",
  "BRN V2": "/icons/brn.svg",
  "BRN V1": "/icons/brn.svg",
};

const explorerUrls = {
  "Ethereum Sepolia": "https://sepolia.etherscan.io/address/",
  "Arbitrum Sepolia": "https://sepolia.arbiscan.io/address/",
  "Arbitrum Sepolia (BRN)": "https://sepolia.arbiscan.io/token/0x2e76CA39c9bd8d99B2681A60319fC0FE7C9d8336?a=",
  "Base Sepolia": "https://sepolia.basescan.org/address/",
  "Optimism Sepolia": "https://sepolia-optimism.etherscan.io/address/",
  "Blast Sepolia": "https://sepolia.blastscan.io/address/",
  "Unichain Sepolia": "https://unichain-sepolia.blockscout.com/address/",
  "BRN V2": "https://b2n.explorer.caldera.xyz/address/",
  "BRN V1": "https://brn.explorer.caldera.xyz/address/",
};

function App() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState(null);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(true);

  const fetchBalance = async () => {
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      setError("Invalid Address");
      setBalances(null);
      return;
    }

    setLoading(true);
    setError("");
    setBalances(null);

    try {
      const res = await fetch(
        `https://62ad-147-139-176-162.ngrok-free.app/balance/${address}`,
        {
          headers: { "ngrok-skip-browser-warning": "true" },
        }
      );
      const data = await res.json();
      setBalances(data);
    } catch (err) {
      setError("Error, Please Try Again Later");
    }

    setLoading(false);
  };

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300 relative",
        dark ? "bg-gray-900 text-white" : "bg-white text-black"
      )}
    >
      {/* Tombol Moon dan Sun di pojok kanan atas */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full border hover:rotate-90 transition"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="max-w-xl mx-auto px-0 py-6" style={{ width: "100%" }}>
        <div
          className={cn(
            "w-full p-6 rounded-xl shadow-lg border-2",
            dark ? "bg-gray-800 border-gray-700" : "bg-gray-200 border-gray-300"
          )}
          style={{ maxWidth: "100%", margin: 0 }}
        >
          <h1 className="text-2xl font-bold mb-4 text-center">
            BALANCE SCAN ETH + BRN | TESTNET
          </h1>
          <div className="relative mb-4">
            <input
              type="text"
              className={cn(
                "flex w-full rounded-[16px] p-4 ring-offset-background file:border-0 file:bg-transparent",
                "placeholder:text-input-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                "disabled:cursor-not-allowed disabled:opacity-50 px-10 py-2.5",
                dark ? "bg-[#1E2026] text-white" : "bg-white text-black"
              )}
              placeholder="Input ETH Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute text-[#cecece] top-0 left-0 translate-x-[16px]"
              style={{ top: "calc(50% - 8px)" }}
              height="16"
              width="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" />
            </svg>
            {address && (
              <button
                type="button"
                className="absolute text-[#cecece] hover:opacity-50"
                style={{ top: "calc(50% - 8px)", right: "16px", opacity: 1 }}
                onClick={() => setAddress("")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z" />
                </svg>
              </button>
            )}
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={fetchBalance}
              className="bg-[#3396FF] px-6 py-2 rounded-full border-2 border-blue-700 hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 active:bg-blue-700"
            >
              Scan Now
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {loading && (
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-4 border-[rgb(242,90,103)] border-t-transparent rounded-full animate-spin"></div>
                <div className="text-[rgb(242,90,103)] text-sm animate-pulse">
                  Scanning, Please Wait!
                </div>
              </div>
            )}

            {!loading && error && (
              <div className="text-red-500 text-center">{error}</div>
            )}

            <AnimatePresence>
              {!loading &&
                balances &&
                Object.entries(balances).map(([net, bal]) => (
                  <motion.a
                    key={net}
                    href={`${
                      explorerUrls[net] || explorerUrls["Ethereum Sepolia"]
                    }${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex justify-between items-center p-4 rounded-2xl shadow hover:scale-[1.02] transition",
                      dark
                        ? "bg-gray-700"
                        : "bg-white"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={icons[net]}
                        alt={net}
                        className="w-6 h-6"
                      />
                      <span>{net}</span>
                    </div>
                    <div>
                      {bal} {net.includes("BRN") ? "BRN" : "ETH"}
                    </div>
                  </motion.a>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
