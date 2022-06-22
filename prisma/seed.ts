import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
        name: "Wade Martin",
        avatar: "https://blue-rabbit-code-challenge.s3.amazonaws.com/Shaun-Tan-Tales-from-inner-city-prints-the-vision-deer.jpg"
    }
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })