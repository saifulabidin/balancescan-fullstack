const express = require("express");
const { ethers } = require("ethers");
const cors = require("cors");

const app = express();
app.use(cors());

const networks = {
  "Ethereum Sepolia": ["https://1rpc.io/sepolia"],
  "Arbitrum Sepolia": ["https://sepolia-rollup.arbitrum.io/rpc"],
  "Base Sepolia": ["https://base-sepolia-rpc.publicnode.com"],
  "Optimism Sepolia": ["https://sepolia.optimism.io"],
  "Blast Sepolia": ["https://sepolia.blast.io"],
  "Unichain Sepolia": ["https://unichain-sepolia.drpc.org", "https://sepolia.unichain.org"],
  "BRN V2": ["https://b2n.rpc.caldera.xyz/http"],
  "BRN V1": ["https://brn.rpc.caldera.xyz"]
};

// BRN Token di Arbitrum Sepolia
const tokens = {
  "Arbitrum Sepolia (BRN)": {
    address: "0x2e76CA39c9bd8d99B2681A60319fC0FE7C9d8336",
    rpc: "https://sepolia-rollup.arbitrum.io/rpc"
  }
};

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

app.get("/balance/:address", async (req, res) => {
  const { address } = req.params;
  const result = {};

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: "Invalid address" });
  }

  // Cek ETH Balance semua jaringan
  for (const [network, rpcList] of Object.entries(networks)) {
    let balance = null;
    for (let rpc of rpcList) {
      try {
        const provider = new ethers.JsonRpcProvider(rpc);
        const rawBalance = await provider.getBalance(address);
        balance = ethers.formatEther(rawBalance);
        break;
      } catch (err) {
        console.log(`RPC failed for ${network}: ${rpc}`);
        continue;
      }
    }
    result[network] = balance ? parseFloat(balance).toFixed(6) : "error";
  }

  // Cek BRN Token Balance
  for (const [label, token] of Object.entries(tokens)) {
    try {
      const provider = new ethers.JsonRpcProvider(token.rpc);
      const contract = new ethers.Contract(token.address, ERC20_ABI, provider);
      const decimals = await contract.decimals();
      const rawBalance = await contract.balanceOf(address);
      const formatted = Number(ethers.formatUnits(rawBalance, decimals));
      result[label] = formatted.toFixed(6);
    } catch (err) {
      console.log(`Token fetch error for ${label}`);
      result[label] = "error";
    }
  }

  res.json(result);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
