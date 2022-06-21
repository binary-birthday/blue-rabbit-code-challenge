import { gql } from "apollo-server-micro"

export const typeDefs = gql`
    type User {
        id: String!
        name: String!
        avatar: String
    }

    type Query {
     user(name: String!): User!
    }

    type Mutation {
    	createUser(name: String!, avatar: String): User
    }
`