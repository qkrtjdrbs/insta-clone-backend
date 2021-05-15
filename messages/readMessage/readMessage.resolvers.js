import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      //search messages which is not sent by me and is sent in rooms which I'm in
      const message = await client.message.findFirst({
        where: {
          id,
          userId: {
            not: loggedInUser.id,
          },
          room: {
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        },
        select: {
          id: true,
        },
      });
      if (!message) {
        return {
          ok: false,
          error: "Message not found.",
        };
      }
      await client.message.update({
        where: { id: message.id },
        data: {
          read: true,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
