import axios from "axios";

export async function getAccountDetails (userAddress, chain){
    const url = new URL("http:/localhost:3001/getTokens")
    const response = await axios.get(url.toString(), {
        params : {
            userAddress,
            chain
        }
    });    
    return response.data
}