import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'; 
import { Transaction } from '@mysten/sui/transactions';

const client = new SuiClient({
    url: getFullnodeUrl('testnet'),
});


const keypair = new Ed25519Keypair();

const tx = new Transaction();

const [coin] = tx.splitCoins(tx.gas,[1000]);//Change the 1000 to allow for input from the donor to reflect here

tx.transferObjects([coin],keypair.getPublicKey().toSuiAddress());

const result = await client.signAndExecuteTransaction({
    signer:keypair,
    transaction:tx,
});

console.log({result})//Post the result in the confirmed transaction section
