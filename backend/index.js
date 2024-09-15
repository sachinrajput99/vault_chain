const express = require("express");
const Moralis = require("moralis").default;
const { moralisAccountDetails } = require("./utils/moralisUtils");
const { crossFiAccountDetails } = require("./utils/crossFiUtils");
const app = express();
const cors = require("cors");
const { validateAddress } = require("./utils/valid");
require("dotenv").config();
const port = 3006;

app.use(cors());
app.use(express.json());

app.get("/getTokens", async (req, res) => {
  try {
    const { userAddress, chain } = req.query

    const isValidUser = await validateAddress(userAddress);

    if (!isValidUser) {
      return res.status(400).json("Invalid User");
    }


    const data = chain === '4157' ? await crossFiAccountDetails(userAddress) : await moralisAccountDetails(userAddress, chain);

    return res.status(200).json(data);
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
