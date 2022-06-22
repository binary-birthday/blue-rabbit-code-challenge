import { gql } from "@apollo/client"

const GetUser = gql`
  query User($name: String!) {
     user(name: $name){
      id
      name
      avatar
    }
  }
`

export default GetUser