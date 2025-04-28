
import { useEffect, useState } from 'react';
import convertSeconds from '../utilities/convert-seconds';
import ConvertCoin from '../utilities/convert-coin';

function Account() {
    const [accountName, setAccountName] = useState("Account");
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
            setAccountName(data.name);
            setAccountAge(convertSeconds(data.age));
            setaccountCoin(ConvertCoin(data.coin));
        }
        getAcc();
    }, [])

    return (
        <>
            <h1>{accountName}</h1>
            <div>
                <ul>
                    <li>Age: {accountAge}</li>
                    <li>Coin: {accountCoin.gold} Gold, {accountCoin.silver} Silver, {accountCoin.copper} Copper
                        </li>

                </ul>


            </div>

        </>
    );
}
export default Account;