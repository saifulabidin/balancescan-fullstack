const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');

const app = express();
app.use(cors());

const networks = {
  "Ethereum Sepolia": ["https://1rpc.io/sepolia"],
  "Arbitrum Sepolia": ["https://arbitrum-sepolia.drpc.org", "https://sepolia-rollup.arbitrum.io/rpc"],
  "Base Sepolia": ["https://base-sepolia-rpc.publicnode.com", "https://base-sepolia.drpc.org"],
  "Optimism Sepolia": ["https://sepolia.optimism.io", "https://optimism-sepolia.drpc.org"],
  "Blast Sepolia": ["https://sepolia.blast.io", "https://blast-sepolia.drpc.org"],
  "Unichain Sepolia": ["https://unichain-sepolia.drpc.org", "https://sepolia.unichain.org"],
  "B2N Network": ["https://t3rn-b2n.blockpi.network/v1/rpc/public", "https://b2n.rpc.caldera.xyz/http"],
  "B2N V1 Network": ["https://brn.rpc.caldera.xyz"],
};

app.get("/balance/:address", async (req, res) => {
  const { address } = req.params;
  const result = {};

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: "Invalid address" });
  }

  for (const [network, rpcList] of Object.entries(networks)) {
    let balance = null;

    for (let rpc of rpcList) {
      try {
        const provider = new ethers.JsonRpcProvider(rpc);
        const rawBalance = await provider.getBalance(address);
        balance = ethers.formatEther(rawBalance);
        break; // ✅ sukses, keluar dari loop RPC
      } catch (err) {
        console.log(`RPC failed for ${network}: ${rpc}`);
        continue;
      }
    }

    result[network] = balance ? parseFloat(balance).toFixed(6) : "error";
  }

  res.json(result);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
