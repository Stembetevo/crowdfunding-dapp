import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';

// Generate a new Ed25519 Keypair
const keypair = new Ed25519Keypair();
const client = new SuiClient({
	url: getFullnodeUrl('testnet'),
});

const tx = new Transaction();
tx.mergeCoins('0xe19739da1a701eadc21683c5b127e62b553e833e8a15a4f292f4f48b4afea3f2', [
	'0x127a8975134a4824d9288722c4ee4fc824cd22502ab4ad9f6617f3ba19229c1b',
]);//This is dummy inputs so it needs to check whether the address withdrawing it is same to the owner and the balance of the wallet to join his wallet and close the wallet

const result = await client.signAndExecuteTransaction({
	signer: keypair,
	transaction: tx,
});
console.log({ result });