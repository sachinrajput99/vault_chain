const Moralis = require("moralis").default;
require("dotenv").config();

async function validateAddress(userAddress) {
    try {

        const balance = await Moralis.EvmApi.balance.getNativeBalance({ address: userAddress, chain: '1' });

        return !!balance;
    } catch (error) {
        if (error.code === 'C005') {
            return false
        }
    }
}

module.exports = { validateAddress }