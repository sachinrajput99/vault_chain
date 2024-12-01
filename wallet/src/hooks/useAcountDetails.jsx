import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import useEffectAfterMount from "./useEffectAfterMount"
import { WalletContext } from "../providers/WalletProvider";

export default function useAccountDetails() {
    const { wallet, selectedChain } = useContext(WalletContext);
    const [nfts, setNfts] = useState(null);
    const [balance, setBalance] = useState(null);
    const [tokens, setTokens] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const resetAccountData = useCallback(() => {
        setNfts(null);
        setBalance(null);
        setTokens(null);
        setTransactions(null);
    }, [])

    const getAccountDetails = useCallback(async (userAddress, chain) => {
        setIsFetching(true);        
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/getTokens`, {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getTokens`, {
            params: {
                userAddress,
                chain
            }
        });
        const data = response.data
        setTokens(data.tokens);
        setNfts(data.nfts?.length > 0 ? data.nfts : null);
        setBalance(data.balance);
        setTransactions(data.transactions?.length > 0 ? data.transactions : null);
        setIsFetching(false);
    }, [])

    // Initially fetch account details
    useEffect(() => {
        if ((!wallet || !selectedChain)) {
            return
        }
        getAccountDetails(wallet, selectedChain)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // After any updates in the wallet, fetch the account details
    useEffectAfterMount(() => {
        if ((!wallet || !selectedChain)) {
            return
        }
        getAccountDetails(wallet, selectedChain);
    }, [selectedChain, wallet])
    
    return {
        nfts,
        balance,
        tokens,
        isFetching,
        resetAccountData,
        getAccountDetails,
        transactions
    };
}