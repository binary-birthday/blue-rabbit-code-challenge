export const resolvers = {
  Query: {
    async user(_parent, args, ctx, _info) {
      return await ctx.prisma.user.findUnique({
        where: {
          id: args.id,
          name: args.name
        }
      })
    }
  },
  Mutation: {
    createUser: async (_parent, args, ctx, _info) => {
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