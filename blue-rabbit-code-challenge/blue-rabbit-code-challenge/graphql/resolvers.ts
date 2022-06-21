export const resolvers = {
        Query: {
          user(parent, args, ctx, info) {
            return ctx.prisma.user.findUnique({
              where: {
                name: args.name
              }
            })
          }
        }
}