import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'; 
import { Transaction } from '@mysten/sui/transactions';

const client = new SuiClient({
    url: getFullnodeUrl('testnet'),
});

export async function donate(amount: number, recipientAddress: string) {
    const keypair = new Ed25519Keypair();

    const tx = new Transaction();

    const [coin] = tx.splitCoins(tx.gas, [amount]);

    tx.transferObjects([coin], recipientAddress);

    const result = await client.signAndExecuteTransaction({
        signer: keypair,
        transaction: tx,
    });

    console.log({ result }); // Post the result in the confirmed transaction section
    return result;
}
