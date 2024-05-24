/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateGame = /* GraphQL */ `subscription OnCreateGame($filter: ModelSubscriptionGameFilterInput) {
  onCreateGame(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateGameSubscriptionVariables,
  APITypes.OnCreateGameSubscription
>;
export const onCreateGamePool = /* GraphQL */ `subscription OnCreateGamePool($filter: ModelSubscriptionGamePoolFilterInput) {
  onCreateGamePool(filter: $filter) {
    category
    createdAt
    id
    queue
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateGamePoolSubscriptionVariables,
  APITypes.OnCreateGamePoolSubscription
>;
export const onCreateLeaderboard = /* GraphQL */ `subscription OnCreateLeaderboard(
  $filter: ModelSubscriptionLeaderboardFilterInput
) {
  onCreateLeaderboard(filter: $filter) {
    createdAt
    id
    points
    updatedAt
    username
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateLeaderboardSubscriptionVariables,
  APITypes.OnCreateLeaderboardSubscription
>;
export const onCreatePlayer = /* GraphQL */ `subscription OnCreatePlayer($filter: ModelSubscriptionPlayerFilterInput) {
  onCreatePlayer(filter: $filter) {
    createdAt
    id
    updatedAt
    username
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePlayerSubscriptionVariables,
  APITypes.OnCreatePlayerSubscription
>;
export const onDeleteGame = /* GraphQL */ `subscription OnDeleteGame($filter: ModelSubscriptionGameFilterInput) {
  onDeleteGame(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteGameSubscriptionVariables,
  APITypes.OnDeleteGameSubscription
>;
export const onDeleteGamePool = /* GraphQL */ `subscription OnDeleteGamePool($filter: ModelSubscriptionGamePoolFilterInput) {
  onDeleteGamePool(filter: $filter) {
    category
    createdAt
    id
    queue
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteGamePoolSubscriptionVariables,
  APITypes.OnDeleteGamePoolSubscription
>;
export const onDeleteLeaderboard = /* GraphQL */ `subscription OnDeleteLeaderboard(
  $filter: ModelSubscriptionLeaderboardFilterInput
) {
  onDeleteLeaderboard(filter: $filter) {
    createdAt
    id
    points
    updatedAt
    username
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteLeaderboardSubscriptionVariables,
  APITypes.OnDeleteLeaderboardSubscription
>;
export const onDeletePlayer = /* GraphQL */ `subscription OnDeletePlayer($filter: ModelSubscriptionPlayerFilterInput) {
  onDeletePlayer(filter: $filter) {
    createdAt
    id
    updatedAt
    username
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePlayerSubscriptionVariables,
  APITypes.OnDeletePlayerSubscription
>;
export const onUpdateGame = /* GraphQL */ `subscription OnUpdateGame($filter: ModelSubscriptionGameFilterInput) {
  onUpdateGame(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateGameSubscriptionVariables,
  APITypes.OnUpdateGameSubscription
>;
export const onUpdateGamePool = /* GraphQL */ `subscription OnUpdateGamePool($filter: ModelSubscriptionGamePoolFilterInput) {
  onUpdateGamePool(filter: $filter) {
    category
    createdAt
    id
    queue
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateGamePoolSubscriptionVariables,
  APITypes.OnUpdateGamePoolSubscription
>;
export const onUpdateLeaderboard = /* GraphQL */ `subscription OnUpdateLeaderboard(
  $filter: ModelSubscriptionLeaderboardFilterInput
) {
  onUpdateLeaderboard(filter: $filter) {
    createdAt
    id
    points
    updatedAt
    username
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateLeaderboardSubscriptionVariables,
  APITypes.OnUpdateLeaderboardSubscription
>;
export const onUpdatePlayer = /* GraphQL */ `subscription OnUpdatePlayer($filter: ModelSubscriptionPlayerFilterInput) {
  onUpdatePlayer(filter: $filter) {
    createdAt
    id
    updatedAt
    username
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePlayerSubscriptionVariables,
  APITypes.OnUpdatePlayerSubscription
>;
