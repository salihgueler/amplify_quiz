import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "amplifyQuiz",
  access: (allow) => ({
    "profile-pictures/*": [
      allow.authenticated.to(["read"]),
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
  }),
});
