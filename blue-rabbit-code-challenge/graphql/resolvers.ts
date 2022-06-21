import { Select } from "@chakra-ui/react"

export const resolvers = {
  Query: {
    async user(parent, args, ctx, info) {
      return await ctx.prisma.user.findUnique({
        where: {
          id: args.id,
          name: args.name
        }
      })
    }
  },
  Mutation: {
    createUser: async (parent, args, ctx, info) => {
      try {
        const user = await ctx.prisma.user.upsert({
          where: {
            name: args.name
          },
          create: {
            name: args.name,
            avatar: args.avatar
          },
          update: {
            avatar: args.avatar
          },
          select: {
            id: true,
            name: true,
            avatar: true
          }
        })
        return user
      } catch (e) {
        console.error(e)
      }
    }
      }
}