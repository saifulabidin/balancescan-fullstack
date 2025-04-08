import React, { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { isValidAddress } from "./constants";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import BalanceItem from "./components/BalanceItem";
import SocialLinks from "./components/SocialLinks";
import "./App.css"; // Import file CSS

// Komponen utama aplikasi
function App() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState(null);
  const [error, setError] = useState("");

  // Fungsi untuk mengambil saldo berdasarkan alamat
  const fetchBalance = useCallback(async () => {
    if (!isValidAddress(address)) {
      setError("Enter Valid Address !");
      setBalances(null);
      return;
    }

    setLoading(true);
    setError("");
    setBalances(null);

    try {
      const res = await fetch(
        `https://62ad-147-139-176-162.ngrok-free.app/balance/${address}`,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      const data = await res.json();
      setBalances(data);
    } catch {
      setError("RPC Error, Please Try Again Later");
    } finally {
      setLoading(false);
    }
  }, [address]);

  return (
    <div className="app-container">
      <div className="content-container">
        <div className="card">
          <h1 className="title">BALANCE SCAN ETH + BRN | TESTNET</h1>
          {/* Input untuk memasukkan alamat ETH */}
          <div className="input-container">
            <input
              type="search"
              className="input-field"
              placeholder="Search by Order ID / Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="search-icon"
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
                className="clear-button"
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
          {/* Tombol untuk memulai pemindaian */}
          <div className="button-container">
            {!loading && (
              <button
                onClick={fetchBalance}
                className="fetch-button"
              >
                {balances ? "Scan Again" : "Scan Now"}
              </button>
            )}
          </div>

          {/* Hasil pemindaian */}
          <div className="results-container">
            {loading && <Loader />}
            {!loading && error && <ErrorMessage message={error} />}
            <AnimatePresence>
              {!loading &&
                balances &&
                Object.entries(balances).map(([net, bal]) => (
                  <BalanceItem
                    key={net}
                    net={net}
                    bal={bal}
                    address={address}
                  />
                ))}
            </AnimatePresence>
          </div>

          {/* Tautan media sosial */}
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}

export default App;
