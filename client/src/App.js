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
                className="absolute text-[#cecece] hover:opacity-50 active:text-t3rn-pink"
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
                        ? "bg-gray-700 hover:bg-[rgb(38,181,98)]"
                        : "bg-white hover:bg-[rgb(38,181,98)]"
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

          {/* Social Media Links */}
          <div className="mt-10 text-center">
            <ul className="flex justify-center gap-6">
              <li>
                <a
                  href="https://t.me/syaifulosd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:text-white/80"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 21 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    title="Telegram"
                    className="text-[20px]"
                  >
                    <path
                      d="M2.0547 7.67856L2.06233 7.67545L2.06986 7.67209C7.36394 5.30644 10.8898 3.7488 12.6514 2.99733C15.1746 1.92096 16.6864 1.29446 17.6512 0.935362C18.625 0.572936 18.9883 0.504591 19.2378 0.500036L19.2287 0.00101047L19.2372 0.500046C19.2722 0.499446 19.3506 0.50423 19.4361 0.525202C19.5246 0.546882 19.5831 0.576662 19.6124 0.60109C19.6525 0.634457 19.6781 0.687321 19.6975 0.803401L20.1907 0.721113L19.6975 0.80341C19.7171 0.9205 19.742 1.20549 19.7232 1.40805C19.4522 4.32797 18.2738 11.4538 17.672 14.7537C17.4246 16.1101 16.997 16.2435 16.8759 16.2549C16.2638 16.3127 15.7464 15.9625 14.9548 15.3836L14.9513 15.3811C14.7557 15.2381 14.5461 15.0848 14.3254 14.9364C13.4952 14.3783 12.8536 13.9302 12.2073 13.4787L12.2066 13.4783C11.6149 13.065 11.0189 12.6487 10.2742 12.1454C9.53093 11.6431 9.5509 11.3927 9.56568 11.3158C9.58124 11.2349 9.63621 11.1188 9.77327 10.9483C9.90944 10.779 10.0891 10.6005 10.3099 10.3821L10.3128 10.3793C10.4505 10.2432 10.6011 10.0943 10.7498 9.93586C10.8008 9.88153 11.0944 9.6012 11.543 9.17354L11.5441 9.17245C12.2463 8.50289 13.2794 7.5178 14.146 6.6621C14.579 6.23454 14.9745 5.83527 15.2676 5.52202C15.4135 5.36611 15.5395 5.22577 15.6334 5.11097C15.68 5.05409 15.7244 4.99658 15.7608 4.94228C15.7852 4.90604 15.8491 4.81065 15.876 4.69293L15.3886 4.58145L15.876 4.69292C15.8962 4.60474 15.9028 4.48443 15.8852 4.36318C15.8679 4.24334 15.8152 4.0415 15.6409 3.88269C15.4666 3.72373 15.2644 3.6885 15.1227 3.68736C14.9928 3.68632 14.8746 3.7139 14.8192 3.72682L14.8148 3.72785L14.9119 4.14526L14.8148 3.72785C14.7321 3.74709 14.6566 3.78851 14.635 3.80031C14.6338 3.80101 14.6327 3.8016 14.6318 3.80208C14.5926 3.82331 14.5466 3.85029 14.4963 3.88084C14.3947 3.94254 14.2574 4.02995 14.0863 4.14141C13.7433 4.36494 13.2515 4.69382 12.6126 5.12698C11.334 5.99374 9.45763 7.28357 6.98439 8.99586L6.98438 8.99585L6.9811 8.99816C6.30186 9.47653 5.75032 9.66282 5.31092 9.65308C5.04898 9.64728 4.62341 9.56679 4.11763 9.43671C3.62377 9.30969 3.09198 9.14579 2.6354 8.99356C2.49687 8.94738 2.36207 8.90391 2.23447 8.86276L2.23357 8.86246C1.74159 8.7038 1.39454 8.58903 1.1702 8.45813C1.06412 8.39623 1.02594 8.35265 1.01457 8.33549C1.01424 8.33499 1.01388 8.33456 1.01352 8.33412C1.01144 8.33156 1.00917 8.32877 1.01056 8.31257C1.01474 8.30381 1.04416 8.24189 1.18645 8.13351C1.36147 8.0002 1.64323 7.84638 2.0547 7.67856Z"
                      fill="currentColor"
                      stroke="currentColor"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/syaifulosd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:text-white/80"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-[20px]"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>X</title>
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/YwgTe9Cj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:text-white/80"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 640 512"
                    className="text-[20px]"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Discord</title>
                    <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@Sabidz2704"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:text-white/80"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 576 512"
                    className="text-[20px]"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Youtube</title>
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
