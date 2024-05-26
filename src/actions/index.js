// src/actions/index.ts

import { defineAction, z } from "astro:actions";

export const server = {
  //REGISTER
  register: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      password_confirm: z.string(),
    }),
    handler: async (
      { name, email, password, password_confirm },
      { locals }
    ) => {
      // call a mailing service, or store to a database
      const data = {
        name: name,
        email: email,
        password: password,
        passwordConfirm: password_confirm,
      };

      const record = await locals.pb.collection("users").create(data);

      return { success: true };
    },
  }),

  //LOGIN
  login: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    handler: async ({ email, password }, { locals }) => {
      // Set your login details Email and Password, and create your Auth cookie using your middleware

      try {
        const { token, record } = await locals.pb
          .collection("users")
          .authWithPassword(email, password);
      } catch (error) {
        console.log(error);
      }

      return { success: true };
    },
  }),

  //Logout
  logout: defineAction({
    accept: "form",
    input: z.object({}),
    handler: async ({}, { locals }) => {
      try {
        // deletes your Auth cookie
        const logout = await locals.pb.authStore.clear();
      } catch (error) {
        console.log(error);
      }

      return { success: true };
    },
  }),
};
