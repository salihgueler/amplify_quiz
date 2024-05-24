/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createGame = /* GraphQL */ `mutation CreateGame(
  $condition: ModelGameConditionInput
  $input: CreateGameInput!
) {
  createGame(condition: $condition, input: $input) {
    category
    createdAt
    finished
    id
    players
    questions
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateGameMutationVariables,
  APITypes.CreateGameMutation
>;
export const createGamePool = /* GraphQL */ `mutation CreateGamePool(
  $condition: ModelGamePoolConditionInput
  $input: CreateGamePoolInput!
) {
  createGamePool(condition: $condition, input: $input) {
    category
    createdAt
    id
    queue
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateGamePoolMutationVariables,
  APITypes.CreateGamePoolMutation
>;
export const createLeaderboard = /* GraphQL */ `mutation CreateLeaderboard(
  $condition: ModelLeaderboardConditionInput
  $input: CreateLeaderboardInput!
) {
  createLeaderboard(condition: $condition, input: $input) {
    createdAt
    id
    points
    updatedAt
    username
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateLeaderboardMutationVariables,
  APITypes.CreateLeaderboardMutation
>;
export const createPlayer = /* GraphQL */ `mutation CreatePlayer(
  $condition: ModelPlayerConditionInput
  $input: CreatePlayerInput!
) {
  createPlayer(condition: $condition, input: $input) {
    createdAt
    id
    updatedAt
    username
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePlayerMutationVariables,
  APITypes.CreatePlayerMutation
>;
export const deleteGame = /* GraphQL */ `mutation DeleteGame(
  $condition: ModelGameConditionInput
  $input: DeleteGameInput!
) {
  deleteGame(condition: $condition, input: $input) {
    category
    createdAt
    finished
    id
    players
    questions
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteGameMutationVariables,
  APITypes.DeleteGameMutation
>;
export const deleteGamePool = /* GraphQL */ `mutation DeleteGamePool(
  $condition: ModelGamePoolConditionInput
  $input: DeleteGamePoolInput!
) {
  deleteGamePool(condition: $condition, input: $input) {
    category
    createdAt
    id
    queue
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteGamePoolMutationVariables,
  APITypes.DeleteGamePoolMutation
>;
export const deleteLeaderboard = /* GraphQL */ `mutation DeleteLeaderboard(
  $condition: ModelLeaderboardConditionInput
  $input: DeleteLeaderboardInput!
) {
  deleteLeaderboard(condition: $condition, input: $input) {
    createdAt
    id
    points
    updatedAt
    username
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteLeaderboardMutationVariables,
  APITypes.DeleteLeaderboardMutation
>;
export const deletePlayer = /* GraphQL */ `mutation DeletePlayer(
  $condition: ModelPlayerConditionInput
  $input: DeletePlayerInput!
) {
  deletePlayer(condition: $condition, input: $input) {
    createdAt
    id
    updatedAt
    username
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePlayerMutationVariables,
  APITypes.DeletePlayerMutation
>;
export const updateGame = /* GraphQL */ `mutation UpdateGame(
  $condition: ModelGameConditionInput
  $input: UpdateGameInput!
) {
  updateGame(condition: $condition, input: $input) {
    category
    createdAt
    finished
    id
    players
    questions
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateGameMutationVariables,
  APITypes.UpdateGameMutation
>;
export const updateGamePool = /* GraphQL */ `mutation UpdateGamePool(
  $condition: ModelGamePoolConditionInput
  $input: UpdateGamePoolInput!
) {
  updateGamePool(condition: $condition, input: $input) {
    category
    createdAt
    id
    queue
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateGamePoolMutationVariables,
  APITypes.UpdateGamePoolMutation
>;
export const updateLeaderboard = /* GraphQL */ `mutation UpdateLeaderboard(
  $condition: ModelLeaderboardConditionInput
  $input: UpdateLeaderboardInput!
) {
  updateLeaderboard(condition: $condition, input: $input) {
    createdAt
    id
    points
    updatedAt
    username
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateLeaderboardMutationVariables,
  APITypes.UpdateLeaderboardMutation
>;
export const updatePlayer = /* GraphQL */ `mutation UpdatePlayer(
  $condition: ModelPlayerConditionInput
  $input: UpdatePlayerInput!
) {
  updatePlayer(condition: $condition, input: $input) {
    createdAt
    id
    updatedAt
    username
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePlayerMutationVariables,
  APITypes.UpdatePlayerMutation
>;
