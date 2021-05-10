const { gql } = require("apollo-server-express");

export default gql`
  type Mutation {
    editComment(id: Int!, payload: String!): MutationResponse!
  }
`;
