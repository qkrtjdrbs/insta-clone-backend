import { gql } from "apollo-server-express";

export default gql`
  type Query {
    searchUsers(keyword: String!, lastId: Int): [User]!
  }
`;
