import React, { useState } from "react";

const icons = {
  "Ethereum Sepolia": "/icons/eth.svg",
  "Arbitrum Sepolia": "/icons/arbm.svg",
  "Base Sepolia": "/icons/bast.svg",
  "Optimism Sepolia": "/icons/opst.svg",
  "Blast Sepolia": "/icons/blst.svg",
  "Unichain Sepolia": "/icons/unit.svg",
  "B2N Network": "/icons/brn.svg",
};

function App() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState(null);
  const [error, setError] = useState("");

  const fetchBalance = async () => {
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      setError("Input Address Sing Benere Lonte !");
      setBalances(null);
      return;
    }

    setLoading(true);
    setError("");
    setBalances(null);

    try {
      const res = await fetch(`http://147.139.176.162:5000/balance/${address}`);
      const data = await res.json();
      setBalances(data);
    } catch (err) {
      setError("Gagal Ngambil Data Saldo");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Cek Saldo ETH | TestNet</h1>
        <input
          type="text"
          className="w-full p-2 rounded mb-4 text-black"
          placeholder="Address Ethereum 0x... Ojo Ngawur Lonte iii"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          onClick={fetchBalance}
          className="bg-blue-600 w-full px-4 py-2 rounded hover:bg-blue-700"
        >
          Check Saldo Saiki
        </button>

        {loading && (
          <div className="animate-pulse text-center text-blue-500 mt-4">
            Sabar SU Lagi Di Cek !
          </div>
        )}
        {error && (
          <div className="text-red-500 mt-4 text-center">
            Modaro Error Hahaha {error}
          </div>
        )}
        {balances && (
          <table className="w-full mt-6 text-left">
            <tbody>
              {Object.entries(balances).map(([net, bal]) => (
                <tr key={net}>
                  <td className="py-2 flex items-center">
                    <img src={icons[net]} alt={net} className="w-6 h-6 inline-block mr-2" />
                    {net}
                  </td>
                  <td className="py-2 text-right">{bal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
