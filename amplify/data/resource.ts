import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { postConfirmation } from "../auth/post-confirmation/resource";

const schema = a
  .schema({
    Leaderboard: a
      .model({
        username: a.string().required(),
        points: a.integer().required(),
      })
      .authorization((allow) => [allow.authenticated()]),
    Player: a
      .model({
        id: a.string().required(),
        username: a.string().required(),
        gameId: a.id(),
        game: a.belongsTo("Game", "gameId"),
      })
      .authorization((allow) => [allow.authenticated()]),
    Game: a
      .model({
        id: a.string().required(),
        category: a.string().required(),
        questions: a.string().required(), // JSON string of questions
        currentQuestionIndex: a.integer().default(0).required(), // Shared index
        players: a.hasMany("Player", "gameId"),
        finished: a.boolean().required(),
        ready: a.boolean().default(false), // Flag to indicate game is ready to start
      })
      .authorization((allow) => [allow.authenticated()]),

    BedrockResponse: a.customType({
      body: a.string(),
      error: a.string(),
    }),

    askBedrock: a
      .query()
      .arguments({ category: a.string() })
      .returns(a.ref("BedrockResponse"))
      .authorization((allow) => allow.authenticated())
      .handler(
        a.handler.custom({ entry: "./bedrock.js", dataSource: "bedrockDS" })
      ),
  })
  .authorization((allow) => [allow.resource(postConfirmation)]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
