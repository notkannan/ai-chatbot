import { Pinecone } from '@pinecone-database/pinecone';

if (!process.env.PINECONE_API_KEY) {
  throw new Error('Pinecone API key is missing');
}

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});