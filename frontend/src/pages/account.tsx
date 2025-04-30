
import { useEffect, useState } from 'react';
import convertSeconds from '../utilities/convert-seconds';
import ConvertCoin from '../utilities/convert-coin';

function Account() {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [apiKey, setApiKey] = useState("");
    const [hasStoredValue, setHasStoredValue] = useState<boolean>(false);
    const [accountName, setAccountName] = useState("No Account Loaded");
    const [accountAge, setAccountAge] = useState("0");
    const [accountCoin, setaccountCoin] = useState({
        gold: 0,
        silver: 0,
        copper: 0,
    })

    const getAcc = async () => {
        const req = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        const data = await fetch('http://localhost:4001/acc', req).then((response) => response.json());
        console.log(data)

        if ("name" in data) {
            setShowDetails(true);
            setAccountName(data.name);
            setAccountAge(convertSeconds(data.age));
            setaccountCoin(ConvertCoin(data.coin));
        }
    }

    const updateAccount = async () => {
        const req = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        await fetch(`http://localhost:4001/acc/update?key=${apiKey}`, req).then((response) => response.json());
        getAcc();
    };

    useEffect(() => {
        const key = localStorage.getItem('userApiKey');
        if (key != undefined) {
            setHasStoredValue(true);
            setApiKey(key);
        }
        getAcc();
    }, []);

    return (
        <>
            <h1>{accountName}</h1>
            <div>
                {hasStoredValue &&
                    (<p>
                        <button onClick={updateAccount}>
                            Refresh
                        </button>
                    </p>)
                }
                {showDetails ?
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