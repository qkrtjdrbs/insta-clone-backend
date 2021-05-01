import { gql } from "apollo-server-core";

export default gql`
  type EditProfile {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      userName: String
      email: String
      password: String
    ): EditProfile
  }
`;
