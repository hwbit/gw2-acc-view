function ConvertCoin(walletCash: number):
{
    gold: number,
    silver: number,
    copper: number
}
{

    const gold = Math.floor(walletCash / 10000);
    const silver = Math.floor((walletCash - gold*10000)/100);
    const copper = Math.floor((walletCash - gold*10000 - silver*100));


    return {
        gold: gold,
        silver: silver,
        copper: copper,
    }
}

export default ConvertCoin;