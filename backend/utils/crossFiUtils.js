const axios = require('axios');

async function crossFiAccountDetails(userAddress) {
    try {

        const res = await axios.get(`https://test.xfiscan.com/api/1.0/addresses/${userAddress}`);
        const balance = res.data.coins[0].amount;

        const transactionRes = await axios.get(`https://test.xfiscan.com/api/1.0/txs?address=${userAddress}`);
        const transactionsData = transactionRes.data.docs;

        const transactions = transactionsData.filter(tx => tx.body.messages[0].data).map(tx => {
            const res = {
                hash: "",
                nonce: 0,
                from_address: "",
                to_address: "",
                amount: 0,
                transaction_fee: 0,
                block_timestamp: 0
            }
            const data = tx.body.messages[0].data;
            res.hash = tx.txhash;
            res.nonce = data.nonce;
            res.from_address = data.from;
            res.to_address = data.to;
            res.transaction_fee = data.base_fee_per_gas;
            res.value = data.value;
            res.block_timestamp = tx.timestamp
            return res
        })

        return {
            balance: parseInt(balance) / (10 ** 18),
            nfts: null,
            tokens: null,
            transactions
        }
    } catch (error) {
        if (error?.response?.status) {
            console.log('Account not found');
        }

        console.log('error', error);

    }
}

module.exports = { crossFiAccountDetails };