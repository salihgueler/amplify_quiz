import React from "react";
import { View, StyleSheet } from "react-native";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import outputs from "./amplify_outputs.json";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import QuizCategoryScreen from "./src/category_selection/QuizCategoryScreen";
import QuestionScreen, { ResultScreen } from "./src/quiz/QuestionScreen";
import GameLobbyScreen from "./src/search_game/GameLobbyScreen";
import ProfileScreen from "./src/profile/ProfileScreen";
import LeaderboardScreen from "./src/leaderboard/LeaderboardScreen";
import SearchGameScreen from "./src/search_game/SearchGameScreen";

export type RootStackParamList = {
  HomeScreen: undefined;
  QuizCategoryScreen: undefined;
  GameLobbyScreen: { selectedCategories: string[] };
  QuestionScreen: { content: string };
  ResultScreen: { score: number };
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: ScreenNavigationProp<T>;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

Amplify.configure(outputs);

const SignOutButton: React.FC = () => {
  const { signOut } = useAuthenticator();
  return (
    <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
      <Ionicons name="log-out-outline" size={32} style={{ margin: 4 }} />
    </TouchableOpacity>
  );
};

const HomeScreen: React.FC<ScreenProps<"HomeScreen">> = ({ navigation }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        const iconColor = focused ? "#FF6347" : "#808080";
        let iconName: keyof typeof Ionicons.glyphMap = "search-outline";
        if (route.name === "SearchGame") {
          iconName = focused ? "search" : "search-outline";
        } else if (route.name === "Leaderboard") {
          iconName = focused ? "trophy" : "trophy-outline";
        } else if (route.name === "Profile") {
          iconName = focused ? "person-circle" : "person-circle-outline";
        }
        return <Ionicons name={iconName} size={size} color={iconColor} />;
      },
      tabBarActiveTintColor: "#FF6347",
      tabBarInactiveTintColor: "#808080",
    })}
  >
    <Tab.Screen
      name="SearchGame"
      component={SearchGameScreen}
      options={{ title: "Search Game" }}
    />
    <Tab.Screen
      name="Leaderboard"
      component={LeaderboardScreen}
      options={{ title: "Leaderboard" }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "Profile",
        headerRight: SignOutButton,
      }}
    />
  </Tab.Navigator>
);

const App: React.FC = () => {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GameLobbyScreen"
              component={GameLobbyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="QuizCategoryScreen"
              component={QuizCategoryScreen}
              options={{ title: "Quiz Categories" }}
            />
            <Stack.Screen
              name="QuestionScreen"
              component={QuestionScreen}
              options={{
                title: "Quiz Question",
                headerLeft: () => null,
              }}
            />
            <Stack.Screen
              name="ResultScreen"
              component={ResultScreen}
              options={{
                title: "Results",
                headerLeft: () => null,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Authenticator>
    </Authenticator.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signOutButton: {
    alignSelf: "flex-end",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  searchButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  searchButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 20,
  },
});

export default App;
