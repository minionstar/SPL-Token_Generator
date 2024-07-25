
const { PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js')
const { createToken } = require('./src/create_token.js')
const { connection } = require('./config.js')
const prompt = require('prompt-sync')({ sigint: true });

require('dotenv').config({ path: `.env.${process.env.NETWORK}` })

const minimumSOLBalance = 1;

main()

async function main() {
    // get account SOL balance
    const address = new PublicKey(process.env.PUBLIC_KEY);
    const balance = await connection.getBalance(address);
    const balanceInSol = balance / LAMPORTS_PER_SOL;
    console.log(`Deployer account Balance: ${balanceInSol} SOL\n`);

    if (balanceInSol < minimumSOLBalance) {
        console.log("Insufficient SOL balance in the account. Please ensure a minimum of", minimumSOLBalance, "SOL is secured to prevent transaction failures.");
        process.exit(1);
    }
    console.log("...Token Info Input...")
    const amount = Number(prompt('amount(default: 10000): ')) || 10000;
    let decimals = Number(prompt('decimals(default: 9): ')) || 9;
    while (decimals > 9 || decimals < 1) {
        console.log("Invalid decimal value, should be a value between 1 and 9");
        decimals = Number(prompt('decimals(default: 9): ')) || 9;
    }
    if (amount * 10 ** decimals > 18446744073709551615n) {
        console.log("invalid supply and decimal value, total supply should be less than 18,446,744,073,709,551,615, including decimals")
        return;
    }

    const symbol = prompt('symbol(default: "TMT"): ') || 'TMT';
    const tokenName = prompt('token name(default: "Test Mock Token"): ') || 'Test Mock Token';

    const tokenInfo = {
        amount,
        decimals,
        metadata: "",
        symbol,
        tokenName
    }

    console.log("Creating Token...")
    const mintAddress = await createToken(tokenInfo)
}


