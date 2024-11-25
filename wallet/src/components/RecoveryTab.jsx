// eslint-disable-next-line
import React from "react";
import { Button, Card, Input, notification, Tooltip } from "antd"
import { useCallback, useContext, useEffect, useState } from "react"
import { WalletContext } from "../providers/WalletProvider";
import {  decryptData, getDataFromToken } from "../utils";
import { TOKEN_KEY } from "../constants";


const { Password } = Input
const RecoveryTab = () => {
    const { seedPhrase } = useContext(WalletContext);
    const [passwordInput, setPasswordInput] = useState();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false);

    const handleValidate = useCallback(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        const decryptedToken = decryptData(token);

        const { password } = getDataFromToken(decryptedToken);
        if (passwordInput === password) {
            setError(false)
            setValidated(true)
        } else {
            setError(true)
        }
    }, [passwordInput])

    const handleCopy = useCallback(() => {
        if (!validated) {
            return
        }
        navigator.clipboard.writeText(seedPhrase)
        notification.success({
            message: "Seed Phrase Copied",
            placement: 'topLeft',
            style: {
                fontSize: 10,
                padding: 9,
                backgroundColor: '#222',
                borderRadius: 5,
                color: '#eee',
                width: "200px",
            },
            closable: false,
            duration: 2
        })
    }, [validated, seedPhrase])
    useEffect(() => {
        return () => {
            setValidated(false)
            setPasswordInput("")
        }
    }, [])

    return (
        <>
            <Password value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="password" placeholder="Type your password here..." />
            {
                error && <p className="bgred bg-red-500 rounded" >Invalid password</p>
            }
            {
                validated ? (
                    <Button className="frontPageButton" type="default" onClick={() => {
                        setPasswordInput("")
                        setValidated(false)
                    }}>Hide</Button>
                ) : <Button className="frontPageButton" type="default" onClick={handleValidate}>Recover Phrase</Button>
            }
            <Tooltip title={validated ? "Click to copy the seed phrase" : ""}>
                <Card className={`seedPhraseContainer ${validated ? "clickEffect" : ""}`} style={{ marginInline: 'auto', marginTop: '9px' }} onClick={handleCopy}>
                    {
                        validated ? <pre style={{ whiteSpace: 'pre-wrap' }}>{seedPhrase}
                        </pre> : <p>Enter your password to recover your seed phrase</p>
                    }
                </Card>
            </Tooltip>
        </>
    )
}

export default RecoveryTab