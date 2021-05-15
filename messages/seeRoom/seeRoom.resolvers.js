import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
export default {
  Query: {
    seeRoom: protectedResolver(async (_, { id }, { loggedInUser }) => {
      //search room which loggedInUser is in
      const room = await client.room.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
        include: {
          users: true,
          messages: true,
        },
      });
      return room;
    }),
  },
};
