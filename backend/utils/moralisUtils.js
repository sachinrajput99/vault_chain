const Moralis = require("moralis").default;
 
async function moralisAccountDetails(userAddress, chain) {
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
        transactions: transactions.slice(0,5)
      }

      return jsonResponses;
}

module.exports = { moralisAccountDetails }