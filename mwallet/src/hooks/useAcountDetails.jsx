import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import useEffectAfterMount from "./useEffectAfterMount"
import { WalletContext } from "../providers/WalletProvider";

export default function useAccountDetails() {
    const { wallet, selectedChain } = useContext(WalletContext);
    const [nfts, setNfts] = useState(null);
    const [balance, setBalance] = useState(null);
    const [tokens, setTokens] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const resetAccountData = useCallback(() => {
        setNfts(null);
        setBalance(null);
        setTokens(null);
    }, [])

    const getAccountDetails = useCallback(async (userAddress, chain) => {
        setIsFetching(true);
        const url = new URL("http:/localhost:3001/getTokens")
        const response = await axios.get(url.toString(), {
            params: {
                userAddress,
                chain
            }
        });
        const data = response.data
        setTokens(data.tokens);
        setNfts(data.nfts.length > 0 ? data.nfts : null);
        setBalance(data.balance);
        setIsFetching(false);
    }, [])

    useEffect(() => {
        if (!wallet || !selectedChain) {
            return
        }
        getAccountDetails(wallet, selectedChain)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffectAfterMount(() => { 
        getAccountDetails(wallet, selectedChain);
    }, [selectedChain, wallet])
    return {
        nfts,
        balance,
        tokens,
        isFetching,
        resetAccountData,
        getAccountDetails
    };
}