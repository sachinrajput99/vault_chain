const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/getTokens", async (req, res) => {
  try {
    const { userAddress, chain } = req.query
    const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
      address: userAddress,
      chain
    })

    const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
      address: userAddress,
      chain,
      mediaItems: true
    })


    const myNFTs = nfts.raw.result.map((nft) => {
      if (nft.media?.media_collection?.high && nft.media?.mimetype?.includes('image')) {
        return nft.media.media_collection.high.url
      }
      return ''
    })

    const balance = await Moralis.EvmApi.balance.getNativeBalance({
      address: userAddress,
      chain,
    })


    const transactionResponse  = await Moralis.EvmApi.transaction.getWalletTransactions({
      address: userAddress,
      chain
    });
  
    const transactions = transactionResponse.toJSON().result.filter((tx => tx.to_address !== null))

    const jsonResponses = {
      tokens: tokens.raw,
      nfts: myNFTs,
      balance: balance.raw.balance / (10 ** 18),
      transactions
    }

    return res.status(200).json(jsonResponses);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server Crashed");
  }
});


Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
