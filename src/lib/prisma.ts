import { env } from '@/Env'
import {PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()