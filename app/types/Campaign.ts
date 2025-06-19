export interface Campaign {
  id:string;
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
  transactionDigest?: string; // Add this
  createdAt?: string; // Add this
  owner?: string; // Add this
  amountRaised?: string; // Add this
  contributors?: number;
}