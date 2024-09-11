import {ethers} from "ethers";
import { useState, useCallback,useContext } from "react";
import { WalletContext } from "../providers/WalletProvider";
import { CHAINS_CONFIG } from "../chains";

export default function useSendTransaction(callbackAfterSuccess) {
    const {seedPhrase, selectedChain} = useContext(WalletContext);
    const [sendToAddress, setSendToAddress] = useState('');
    const [amountToSend, setAmountToSend] = useState('');
    const [processing, setProcessing] = useState(false);
    const [txHash, setTxHash] = useState(null);

    const sendTransaction = useCallback(async () => {
        const chain = CHAINS_CONFIG[selectedChain]
        const provider = new ethers.JsonRpcProvider(chain.rpcUrl);
        const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;
        const wallet = new ethers.Wallet(privateKey, provider);
        const tx = {
            to: sendToAddress,
            value: ethers.parseEther(amountToSend)
        }

        setProcessing(true);

        try {
            const transaction = await wallet.sendTransaction(tx);
            setTxHash(transaction.hash);
            await transaction.wait();
            await callbackAfterSuccess()
        } catch (error) {
            setAmountToSend('')
            setSendToAddress('')
            console.log(error);
        } finally {
            setProcessing(false);
            setTxHash(null);
        }
    }, [selectedChain, seedPhrase, sendToAddress, amountToSend, callbackAfterSuccess]);

    return {
        sendToAddress,
        amountToSend,
        processing,
        txHash,
        sendTransaction,
        setAmountToSend,
        setSendToAddress
    }
}