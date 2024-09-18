import axios from "axios";
import Crypto from "crypto-js"

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

export function encryptData(data){
    const encryptedData = Crypto.AES.encrypt(data, '201238123');
   return encryptedData.toString();
}

export function decryptData(data){
    const dec = Crypto.AES.decrypt(data, '201238123');
    return dec.toString(Crypto.enc.Utf8);
}

export function createToken(seedPhrase, password){
    return `${seedPhrase}-P-${password}`;
}

export function getDataFromToken(token){
    const [seedPhrase, password] = token.split('-P-');
    return {
        seedPhrase,
        password
    }
}