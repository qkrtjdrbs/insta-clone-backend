import client from "../../client";

export default {
  Query: {
    seePhotoComments: (_, { id, lastId }) =>
      client.photo
        .findUnique({
          where: { id },
        })
        .Comment({
          take: 10,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
          orderBy: {
            createdAt: "asc",
          },
        }),
  },
};
