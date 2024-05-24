/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const askBedrock = /* GraphQL */ `query AskBedrock($category: String) {
  askBedrock(category: $category) {
    body
    error
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AskBedrockQueryVariables,
  APITypes.AskBedrockQuery
>;
export const getGame = /* GraphQL */ `query GetGame($id: String!) {
  getGame(id: $id) {
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
` as GeneratedQuery<APITypes.GetGameQueryVariables, APITypes.GetGameQuery>;
export const getGamePool = /* GraphQL */ `query GetGamePool($id: ID!) {
  getGamePool(id: $id) {
    category
    createdAt
    id
    queue
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetGamePoolQueryVariables,
  APITypes.GetGamePoolQuery
>;
export const getLeaderboard = /* GraphQL */ `query GetLeaderboard($id: ID!) {
  getLeaderboard(id: $id) {
    createdAt
    id
    points
    updatedAt
    username
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetLeaderboardQueryVariables,
  APITypes.GetLeaderboardQuery
>;
export const getPlayer = /* GraphQL */ `query GetPlayer($id: String!) {
  getPlayer(id: $id) {
    createdAt
    id
    updatedAt
    username
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPlayerQueryVariables, APITypes.GetPlayerQuery>;
export const listGamePools = /* GraphQL */ `query ListGamePools(
  $filter: ModelGamePoolFilterInput
  $limit: Int
  $nextToken: String
) {
  listGamePools(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      category
      createdAt
      id
      queue
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListGamePoolsQueryVariables,
  APITypes.ListGamePoolsQuery
>;
export const listGames = /* GraphQL */ `query ListGames(
  $filter: ModelGameFilterInput
  $id: String
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listGames(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      category
      createdAt
      finished
      id
      players
      questions
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListGamesQueryVariables, APITypes.ListGamesQuery>;
export const listLeaderboards = /* GraphQL */ `query ListLeaderboards(
  $filter: ModelLeaderboardFilterInput
  $limit: Int
  $nextToken: String
) {
  listLeaderboards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      points
      updatedAt
      username
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLeaderboardsQueryVariables,
  APITypes.ListLeaderboardsQuery
>;
export const listPlayers = /* GraphQL */ `query ListPlayers(
  $filter: ModelPlayerFilterInput
  $id: String
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listPlayers(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      id
      updatedAt
      username
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPlayersQueryVariables,
  APITypes.ListPlayersQuery
>;
