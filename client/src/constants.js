// Ikon untuk setiap jaringan blockchain
export const icons = {
  "Ethereum Sepolia": "/icons/eth.svg",
  "Arbitrum Sepolia": "/icons/arbm.svg",
  "Arbitrum Sepolia (BRN)": "/icons/brn.svg",
  "Base Sepolia": "/icons/bast.svg",
  "Optimism Sepolia": "/icons/opst.svg",
  "Blast Sepolia": "/icons/blst.svg",
  "Unichain Sepolia": "/icons/unit.svg",
  "Monad Testnet": "/icons/mont.svg",
  "BRN V2": "/icons/brn.svg",
  "BRN V1": "/icons/brn.svg",
};

// URL explorer untuk setiap jaringan blockchain
export const explorerUrls = {
  "Ethereum Sepolia": "https://sepolia.etherscan.io/address/",
  "Arbitrum Sepolia": "https://sepolia.arbiscan.io/address/",
  "Arbitrum Sepolia (BRN)": "https://sepolia.arbiscan.io/token/0x2e76CA39c9bd8d99B2681A60319fC0FE7C9d8336?a=",
  "Base Sepolia": "https://sepolia.basescan.org/address/",
  "Optimism Sepolia": "https://sepolia-optimism.etherscan.io/address/",
  "Blast Sepolia": "https://sepolia.blastscan.io/address/",
  "Monad Testnet": "https://monad-testnet.socialscan.io/address",
  "Unichain Sepolia": "https://unichain-sepolia.blockscout.com/address/",
  "BRN V2": "https://b2n.explorer.caldera.xyz/address/",
  "BRN V1": "https://brn.explorer.caldera.xyz/address/",
};

// Fungsi untuk memvalidasi apakah alamat ETH valid
export const isValidAddress = (address) => {
  // Regex untuk memeriksa format alamat Ethereum
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};
