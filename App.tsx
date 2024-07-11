import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
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
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import ResultScreen from "./src/components/ResultScreen";
import LeaderboardScreen from "./src/components/LeaderboardScreen";
import ProfileScreen from "./src/components/ProfileScreen";
import QuizCategoryScreen from "./src/components/QuizCategoryScreen";
import QuestionScreen from "./src/components/QuestionScreen";
import GameLobbyScreen from "./src/components/GameLobbyScreen";
import SearchGameScreen from "./src/components/SearchGameScreen";

export type RootStackParamList = {
  HomeScreen: undefined;
  QuizCategoryScreen: undefined;
  GameLobbyScreen: { selectedCategories: string[] };
  QuestionScreen: { content: string; gameId: string };
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
    <Provider store={store}>
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
    </Provider>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    alignSelf: "flex-end",
  },
});

export default App;
