/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type BedrockResponse = {
  __typename: "BedrockResponse",
  body?: string | null,
  error?: string | null,
};

export type Game = {
  __typename: "Game",
  category: string,
  createdAt: string,
  finished: boolean,
  id: string,
  players: Array< string | null >,
  questions: string,
  updatedAt: string,
};

export type GamePool = {
  __typename: "GamePool",
  category: string,
  createdAt: string,
  id: string,
  queue: Array< string | null >,
  updatedAt: string,
};

export type Leaderboard = {
  __typename: "Leaderboard",
  createdAt: string,
  id: string,
  points: number,
  updatedAt: string,
  username: string,
};

export type Player = {
  __typename: "Player",
  createdAt: string,
  id: string,
  updatedAt: string,
  username: string,
};

export type ModelGamePoolFilterInput = {
  and?: Array< ModelGamePoolFilterInput | null > | null,
  category?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelGamePoolFilterInput | null,
  or?: Array< ModelGamePoolFilterInput | null > | null,
  queue?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelGamePoolConnection = {
  __typename: "ModelGamePoolConnection",
  items:  Array<GamePool | null >,
  nextToken?: string | null,
};

export type ModelGameFilterInput = {
  and?: Array< ModelGameFilterInput | null > | null,
  category?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  finished?: ModelBooleanInput | null,
  id?: ModelStringInput | null,
  not?: ModelGameFilterInput | null,
  or?: Array< ModelGameFilterInput | null > | null,
  players?: ModelStringInput | null,
  questions?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelGameConnection = {
  __typename: "ModelGameConnection",
  items:  Array<Game | null >,
  nextToken?: string | null,
};

export type ModelLeaderboardFilterInput = {
  and?: Array< ModelLeaderboardFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelLeaderboardFilterInput | null,
  or?: Array< ModelLeaderboardFilterInput | null > | null,
  points?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  username?: ModelStringInput | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelLeaderboardConnection = {
  __typename: "ModelLeaderboardConnection",
  items:  Array<Leaderboard | null >,
  nextToken?: string | null,
};

export type ModelPlayerFilterInput = {
  and?: Array< ModelPlayerFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelStringInput | null,
  not?: ModelPlayerFilterInput | null,
  or?: Array< ModelPlayerFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
  username?: ModelStringInput | null,
};

export type ModelPlayerConnection = {
  __typename: "ModelPlayerConnection",
  items:  Array<Player | null >,
  nextToken?: string | null,
};

export type ModelGameConditionInput = {
  and?: Array< ModelGameConditionInput | null > | null,
  category?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  finished?: ModelBooleanInput | null,
  not?: ModelGameConditionInput | null,
  or?: Array< ModelGameConditionInput | null > | null,
  players?: ModelStringInput | null,
  questions?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateGameInput = {
  category: string,
  finished: boolean,
  id?: string | null,
  players: Array< string | null >,
  questions: string,
};

export type ModelGamePoolConditionInput = {
  and?: Array< ModelGamePoolConditionInput | null > | null,
  category?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelGamePoolConditionInput | null,
  or?: Array< ModelGamePoolConditionInput | null > | null,
  queue?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateGamePoolInput = {
  category: string,
  id?: string | null,
  queue: Array< string | null >,
};

export type ModelLeaderboardConditionInput = {
  and?: Array< ModelLeaderboardConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelLeaderboardConditionInput | null,
  or?: Array< ModelLeaderboardConditionInput | null > | null,
  points?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  username?: ModelStringInput | null,
};

export type CreateLeaderboardInput = {
  id?: string | null,
  points: number,
  username: string,
};

export type ModelPlayerConditionInput = {
  and?: Array< ModelPlayerConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelPlayerConditionInput | null,
  or?: Array< ModelPlayerConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
  username?: ModelStringInput | null,
};

export type CreatePlayerInput = {
  id?: string | null,
  username: string,
};

export type DeleteGameInput = {
  id: string,
};

export type DeleteGamePoolInput = {
  id: string,
};

export type DeleteLeaderboardInput = {
  id: string,
};

export type DeletePlayerInput = {
  id: string,
};

export type UpdateGameInput = {
  category?: string | null,
  finished?: boolean | null,
  id: string,
  players?: Array< string | null > | null,
  questions?: string | null,
};

export type UpdateGamePoolInput = {
  category?: string | null,
  id: string,
  queue?: Array< string | null > | null,
};

export type UpdateLeaderboardInput = {
  id: string,
  points?: number | null,
  username?: string | null,
};

export type UpdatePlayerInput = {
  id: string,
  username?: string | null,
};

export type ModelSubscriptionGameFilterInput = {
  and?: Array< ModelSubscriptionGameFilterInput | null > | null,
  category?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  finished?: ModelSubscriptionBooleanInput | null,
  id?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionGameFilterInput | null > | null,
  players?: ModelSubscriptionStringInput | null,
  questions?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionGamePoolFilterInput = {
  and?: Array< ModelSubscriptionGamePoolFilterInput | null > | null,
  category?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionGamePoolFilterInput | null > | null,
  queue?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionLeaderboardFilterInput = {
  and?: Array< ModelSubscriptionLeaderboardFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionLeaderboardFilterInput | null > | null,
  points?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  username?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionPlayerFilterInput = {
  and?: Array< ModelSubscriptionPlayerFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionPlayerFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  username?: ModelSubscriptionStringInput | null,
};

export type AskBedrockQueryVariables = {
  category?: string | null,
};

export type AskBedrockQuery = {
  askBedrock?:  {
    __typename: "BedrockResponse",
    body?: string | null,
    error?: string | null,
  } | null,
};

export type GetGameQueryVariables = {
  id: string,
};

export type GetGameQuery = {
  getGame?:  {
    __typename: "Game",
    category: string,
    createdAt: string,
    finished: boolean,
    id: string,
    players: Array< string | null >,
    questions: string,
    updatedAt: string,
  } | null,
};

export type GetGamePoolQueryVariables = {
  id: string,
};

export type GetGamePoolQuery = {
  getGamePool?:  {
    __typename: "GamePool",
    category: string,
    createdAt: string,
    id: string,
    queue: Array< string | null >,
    updatedAt: string,
  } | null,
};

export type GetLeaderboardQueryVariables = {
  id: string,
};

export type GetLeaderboardQuery = {
  getLeaderboard?:  {
    __typename: "Leaderboard",
    createdAt: string,
    id: string,
    points: number,
    updatedAt: string,
    username: string,
  } | null,
};

export type GetPlayerQueryVariables = {
  id: string,
};

export type GetPlayerQuery = {
  getPlayer?:  {
    __typename: "Player",
    createdAt: string,
    id: string,
    updatedAt: string,
    username: string,
  } | null,
};

export type ListGamePoolsQueryVariables = {
  filter?: ModelGamePoolFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGamePoolsQuery = {
  listGamePools?:  {
    __typename: "ModelGamePoolConnection",
    items:  Array< {
      __typename: "GamePool",
      category: string,
      createdAt: string,
      id: string,
      queue: Array< string | null >,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListGamesQueryVariables = {
  filter?: ModelGameFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListGamesQuery = {
  listGames?:  {
    __typename: "ModelGameConnection",
    items:  Array< {
      __typename: "Game",
      category: string,
      createdAt: string,
      finished: boolean,
      id: string,
      players: Array< string | null >,
      questions: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListLeaderboardsQueryVariables = {
  filter?: ModelLeaderboardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLeaderboardsQuery = {
  listLeaderboards?:  {
    __typename: "ModelLeaderboardConnection",
    items:  Array< {
      __typename: "Leaderboard",
      createdAt: string,
      id: string,
      points: number,
      updatedAt: string,
      username: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPlayersQueryVariables = {
  filter?: ModelPlayerFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPlayersQuery = {
  listPlayers?:  {
    __typename: "ModelPlayerConnection",
    items:  Array< {
      __typename: "Player",
      createdAt: string,
      id: string,
      updatedAt: string,
      username: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateGameMutationVariables = {
  condition?: ModelGameConditionInput | null,
  input: CreateGameInput,
};

export type CreateGameMutation = {
  createGame?:  {
    __typename: "Game",
    category: string,
    createdAt: string,
    finished: boolean,
    id: string,
    players: Array< string | null >,
    questions: string,
    updatedAt: string,
  } | null,
};

export type CreateGamePoolMutationVariables = {
  condition?: ModelGamePoolConditionInput | null,
  input: CreateGamePoolInput,
};

export type CreateGamePoolMutation = {
  createGamePool?:  {
    __typename: "GamePool",
    category: string,
    createdAt: string,
    id: string,
    queue: Array< string | null >,
    updatedAt: string,
  } | null,
};

export type CreateLeaderboardMutationVariables = {
  condition?: ModelLeaderboardConditionInput | null,
  input: CreateLeaderboardInput,
};

export type CreateLeaderboardMutation = {
  createLeaderboard?:  {
    __typename: "Leaderboard",
    createdAt: string,
    id: string,
    points: number,
    updatedAt: string,
    username: string,
  } | null,
};

export type CreatePlayerMutationVariables = {
  condition?: ModelPlayerConditionInput | null,
  input: CreatePlayerInput,
};

export type CreatePlayerMutation = {
  createPlayer?:  {
    __typename: "Player",
    createdAt: string,
    id: string,
    updatedAt: string,
    username: string,
  } | null,
};

export type DeleteGameMutationVariables = {
  condition?: ModelGameConditionInput | null,
  input: DeleteGameInput,
};

export type DeleteGameMutation = {
  deleteGame?:  {
    __typename: "Game",
    category: string,
    createdAt: string,
    finished: boolean,
    id: string,
    players: Array< string | null >,
    questions: string,
    updatedAt: string,
  } | null,
};

export type DeleteGamePoolMutationVariables = {
  condition?: ModelGamePoolConditionInput | null,
  input: DeleteGamePoolInput,
};

export type DeleteGamePoolMutation = {
  deleteGamePool?:  {
    __typename: "GamePool",
    category: string,
    createdAt: string,
    id: string,
    queue: Array< string | null >,
    updatedAt: string,
  } | null,
};

export type DeleteLeaderboardMutationVariables = {
  condition?: ModelLeaderboardConditionInput | null,
  input: DeleteLeaderboardInput,
};

export type DeleteLeaderboardMutation = {
  deleteLeaderboard?:  {
    __typename: "Leaderboard",
    createdAt: string,
    id: string,
    points: number,
    updatedAt: string,
    username: string,
  } | null,
};

export type DeletePlayerMutationVariables = {
  condition?: ModelPlayerConditionInput | null,
  input: DeletePlayerInput,
};

export type DeletePlayerMutation = {
  deletePlayer?:  {
    __typename: "Player",
    createdAt: string,
    id: string,
    updatedAt: string,
    username: string,
  } | null,
};

export type UpdateGameMutationVariables = {
  condition?: ModelGameConditionInput | null,
  input: UpdateGameInput,
};

export type UpdateGameMutation = {
  updateGame?:  {
    __typename: "Game",
    category: string,
    createdAt: string,
    finished: boolean,
    id: string,
    players: Array< string | null >,
    questions: string,
    updatedAt: string,
  } | null,
};

export type UpdateGamePoolMutationVariables = {
  condition?: ModelGamePoolConditionInput | null,
  input: UpdateGamePoolInput,
};

export type UpdateGamePoolMutation = {
  updateGamePool?:  {
    __typename: "GamePool",
    category: string,
    createdAt: string,
    id: string,
    queue: Array< string | null >,
    updatedAt: string,
  } | null,
};

export type UpdateLeaderboardMutationVariables = {
  condition?: ModelLeaderboardConditionInput | null,
  input: UpdateLeaderboardInput,
};

export type UpdateLeaderboardMutation = {
  updateLeaderboard?:  {
    __typename: "Leaderboard",
    createdAt: string,
    id: string,
    points: number,
    updatedAt: string,
    username: string,
  } | null,
};

export type UpdatePlayerMutationVariables = {
  condition?: ModelPlayerConditionInput | null,
  input: UpdatePlayerInput,
};

export type UpdatePlayerMutation = {
  updatePlayer?:  {
    __typename: "Player",
    createdAt: string,
    id: string,
    updatedAt: string,
    username: string,
  } | null,
};

export type OnCreateGameSubscriptionVariables = {
  filter?: ModelSubscriptionGameFilterInput | null,
};

export type OnCreateGameSubscription = {
  onCreateGame?:  {
    __typename: "Game",
    category: string,
    createdAt: string,
    finished: boolean,
    id: string,
    players: Array< string | null >,
    questions: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGamePoolSubscriptionVariables = {
  filter?: ModelSubscriptionGamePoolFilterInput | null,
};

export type OnCreateGamePoolSubscription = {
  onCreateGamePool?:  {
    __typename: "GamePool",
    category: string,
    createdAt: string,
    id: string,
    queue: Array< string | null >,
    updatedAt: string,
  } | null,
};

export type OnCreateLeaderboardSubscriptionVariables = {
  filter?: ModelSubscriptionLeaderboardFilterInput | null,
};

export type OnCreateLeaderboardSubscription = {
  onCreateLeaderboard?:  {
    __typename: "Leaderboard",
    createdAt: string,
    id: string,
    points: number,
    updatedAt: string,
    username: string,
  } | null,
};

export type OnCreatePlayerSubscriptionVariables = {
  filter?: ModelSubscriptionPlayerFilterInput | null,
};

export type OnCreatePlayerSubscription = {
  onCreatePlayer?:  {
    __typename: "Player",
    createdAt: string,
    id: string,
    updatedAt: string,
    username: string,
  } | null,
};

export type OnDeleteGameSubscriptionVariables = {
  filter?: ModelSubscriptionGameFilterInput | null,
};

export type OnDeleteGameSubscription = {
  onDeleteGame?:  {
    __typename: "Game",
    category: string,
    createdAt: string,
    finished: boolean,
    id: string,
    players: Array< string | null >,
    questions: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGamePoolSubscriptionVariables = {
  filter?: ModelSubscriptionGamePoolFilterInput | null,
};

export type OnDeleteGamePoolSubscription = {
  onDeleteGamePool?:  {
    __typename: "GamePool",
    category: string,
    createdAt: string,
    id: string,
    queue: Array< string | null >,
    updatedAt: string,
  } | null,
};

export type OnDeleteLeaderboardSubscriptionVariables = {
  filter?: ModelSubscriptionLeaderboardFilterInput | null,
};

export type OnDeleteLeaderboardSubscription = {
  onDeleteLeaderboard?:  {
    __typename: "Leaderboard",
    createdAt: string,
    id: string,
    points: number,
    updatedAt: string,
    username: string,
  } | null,
};

export type OnDeletePlayerSubscriptionVariables = {
  filter?: ModelSubscriptionPlayerFilterInput | null,
};

export type OnDeletePlayerSubscription = {
  onDeletePlayer?:  {
    __typename: "Player",
    createdAt: string,
    id: string,
    updatedAt: string,
    username: string,
  } | null,
};

export type OnUpdateGameSubscriptionVariables = {
  filter?: ModelSubscriptionGameFilterInput | null,
};

export type OnUpdateGameSubscription = {
  onUpdateGame?:  {
    __typename: "Game",
    category: string,
    createdAt: string,
    finished: boolean,
    id: string,
    players: Array< string | null >,
    questions: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGamePoolSubscriptionVariables = {
  filter?: ModelSubscriptionGamePoolFilterInput | null,
};

export type OnUpdateGamePoolSubscription = {
  onUpdateGamePool?:  {
    __typename: "GamePool",
    category: string,
    createdAt: string,
    id: string,
    queue: Array< string | null >,
    updatedAt: string,
  } | null,
};

export type OnUpdateLeaderboardSubscriptionVariables = {
  filter?: ModelSubscriptionLeaderboardFilterInput | null,
};

export type OnUpdateLeaderboardSubscription = {
  onUpdateLeaderboard?:  {
    __typename: "Leaderboard",
    createdAt: string,
    id: string,
    points: number,
    updatedAt: string,
    username: string,
  } | null,
};

export type OnUpdatePlayerSubscriptionVariables = {
  filter?: ModelSubscriptionPlayerFilterInput | null,
};

export type OnUpdatePlayerSubscription = {
  onUpdatePlayer?:  {
    __typename: "Player",
    createdAt: string,
    id: string,
    updatedAt: string,
    username: string,
  } | null,
};
