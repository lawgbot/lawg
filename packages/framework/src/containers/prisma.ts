import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';
import { kPrisma } from '.';

export async function createPrisma() {
	const prisma = new PrismaClient();
	await prisma.$connect();

	container.register(kPrisma, { useValue: prisma });
}
