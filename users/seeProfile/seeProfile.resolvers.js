import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { userName }) =>
      client.user.findUnique({
        where: {
          userName,
        },
        include: {
          //관계를 로딩하기 위해 따로 include 명령 필요
          following: true,
          followers: true,
        },
      }),
  },
};
