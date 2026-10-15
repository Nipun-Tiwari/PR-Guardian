import { PrismaClient } from './generated/client/index.js';

let client: PrismaClient | undefined;

export function getClient(): PrismaClient {
  if (!client) {
    client = new PrismaClient();
  }
  return client;
}

export async function disconnectClient(): Promise<void> {
  if (client) {
    await client.$disconnect();
    client = undefined;
  }
}

export { PrismaClient };
