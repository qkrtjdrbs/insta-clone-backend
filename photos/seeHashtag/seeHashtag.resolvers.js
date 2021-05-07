import client from "../../client";

export default {
  Query: {
    seeHashtag: (_, { hashtag }) => {
      return client.hashtag.findUnique({
        where: {
          hashtag,
        },
      });
    },
  },
};
