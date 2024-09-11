import { useEffect, useRef } from "react";

export default function useEffectAfterMount(callback, dependencies) {  
const isMounted = useRef(false);

 useEffect(() => {
    if(!isMounted.current) {
        isMounted.current = true;
        return;
    }
    callback();
 }, [...dependencies])
 }