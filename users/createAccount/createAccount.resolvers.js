import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      // check if username or email are already on DB.
      try {
        const existringUser = await client.user.findFirst({
          where: { OR: [{ userName }, { email }] },
        });
        if (existringUser) {
          throw new Error("This username or email already exist.");
        }
        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        // save and return User
        await client.user.create({
          data: {
            userName,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Can't create account.",
        };
      }
    },
  },
};
