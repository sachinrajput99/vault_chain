import { Button, Card, Input, notification, Tooltip } from "antd"
import { useCallback, useContext, useEffect, useState } from "react"
import { WalletContext } from "../providers/WalletProvider";
import { decryptData } from "../utils";


const { Password } = Input
const RecoveryTab = () => {
    const { seedPhrase } = useContext(WalletContext);
    const [passwordInput, setPasswordInput] = useState();
    const [validated, setValidated] = useState(false);

    const handleValidate = useCallback(() => {
        const token = localStorage.getItem('token');
        const dec = decryptData(token);
        // eslint-disable-next-line no-unused-vars
        const [_seedPhrase, password] = dec.split('-P-');
        if (passwordInput === password) {
            setValidated(true)
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
            <Password value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="password" />
            <Button className="frontPageButton" type="primary" onClick={handleValidate}>Recover Phrase</Button>
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