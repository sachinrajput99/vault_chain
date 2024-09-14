const axios = require('axios');

async function crossFiAccountDetails(userAddress) {
    try {

        const res = await axios.get(`https://test.xfiscan.com/api/1.0/addresses/${userAddress}`);
        const balance = res.data.coins[0].amount;

        const transactionRes = await axios.get(`https://test.xfiscan.com/api/1.0/txs?address=${userAddress}`);
        const transactionsData = transactionRes.data.docs;

        const transactions = transactionsData.map(tx => {
            const res = {
                hash: "",
                nonce: 0,
                from_address: "",
                to_address: "",
                value: 0,
                transaction_fee: 0,
                block_timestamp: 0
            }
            const data = tx.body.messages[0].data;

            if (data) {
                res.nonce = data.nonce;
                res.from_address = data.from;
                res.to_address = data.to;
                res.transaction_fee = data.base_fee_per_gas;
                res.value = data.value;
            } else {
                res.nonce = null;
                res.value = tx.auth_info.fee.amount[0].amount;
                res.from_address = tx.addresses[0];
                res.to_address = tx.addresses[2];
                res.value = tx.body.messages[0].amount[0].amount;
            }
            
            res.hash = tx.txhash;
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
        if (error?.response?.status === 404) {

            return {
                balance: null,
                nfts: null,
                tokens: null,
                transactions: null
            }
        }
    }
}

module.exports = { crossFiAccountDetails };