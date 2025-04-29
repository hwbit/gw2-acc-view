
import { useEffect, useState } from 'react';
import convertSeconds from '../utilities/convert-seconds';
import ConvertCoin from '../utilities/convert-coin';

function Account() {
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [accountName, setAccountName] = useState("No Account Loaded");
    const [accountAge, setAccountAge] = useState("0");
    const [accountCoin, setaccountCoin] = useState({
        gold: 0,
        silver: 0,
        copper: 0,
    })

    useEffect(() => {
        const getAcc = async () => {
            const req = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            const data = await fetch('http://localhost:4001/acc', req).then((response) => response.json());
            console.log(data)

            if ("name" in data) {
                setShowMessage(true);
                setAccountName(data.name);
                setAccountAge(convertSeconds(data.age));
                setaccountCoin(ConvertCoin(data.coin));
            }
        }
        getAcc();
    }, []);

    return (
        <>
            <h1>{accountName}</h1>
            <div>
                {showMessage ?
                    (
                        <ul>
                            <li>Age: {accountAge}</li>
                            <li>Coin: {accountCoin.gold} Gold, {accountCoin.silver} Silver, {accountCoin.copper} Copper</li>
                        </ul>
                    )
                    :
                    (
                        <div>
                            <p>Enter <a href="/api-keys">API key</a> to show account details.</p>                      
                        </div>
                    )
                }
                 
            </div>

        </>
    );
}
export default Account;