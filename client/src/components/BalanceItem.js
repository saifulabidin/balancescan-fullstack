import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { icons, explorerUrls } from "../constants";

// Fungsi untuk menentukan simbol mata uang berdasarkan jaringan
const getCurrencySymbol = (net) => {
  if (net === "Monad Testnet") return "MON";
  if (net.includes("BRN")) return "BRN";
  return "ETH";
};

// Komponen BalanceItem untuk menampilkan informasi saldo
const BalanceItem = ({ net, bal, address, dark }) => (
  <motion.a
    href={`${explorerUrls[net] || explorerUrls["Ethereum Sepolia"]}${address}`}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className={cn(
      "balance-item",
      dark ? "balance-item-dark" : "balance-item-light"
    )}
  >
    {/* Bagian kiri: ikon jaringan dan nama jaringan */}
    <div className="flex items-center gap-2">
      <img src={icons[net]} alt={net} className="network-icon" />
      <span className="network-name">{net}</span>
    </div>
    {/* Bagian kanan: jumlah saldo */}
    <div className="balance">
      {bal} {getCurrencySymbol(net)}
    </div>
  </motion.a>
);

export default BalanceItem;
