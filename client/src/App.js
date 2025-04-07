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
      setError("Input Address Sing Bener Lonte !");
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
      setError("Gagal Ngambil Data Saldo");
    }

    setLoading(false);
  };

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        dark ? "bg-gray-900 text-white" : "bg-white text-black"
      )}
    >
      <div className="max-w-xl mx-auto p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full border hover:rotate-90 transition"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div
          className={cn(
            "w-full p-6 rounded-xl shadow-lg",
            dark ? "bg-gray-800" : "bg-gray-200"
          )}
        >
          <h1 className="text-2xl font-bold mb-4 text-center">
            Cek Saldo ETH + BRN
          </h1>
          <input
            type="text"
            className="w-full p-2 rounded mb-4 text-black"
            placeholder="Address Ethereum 0x... Ojo Ngawur Lonte iii"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex justify-center">
            <button
              onClick={fetchBalance}
              className="bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Check Saldo Saiki
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {loading && (
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-blue-400 text-sm animate-pulse">
                  Sabar SU Lagi Di Cek !
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
                      "block p-4 rounded-2xl shadow hover:scale-[1.02] transition",
                      dark
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-white hover:bg-gray-100"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={icons[net]}
                          alt={net}
                          className="w-6 h-6"
                        />
                        <span>{net}</span>
                      </div>
                      <div>{bal}</div>
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
