// hooks/useUserData.ts
import { useState, useEffect } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

interface UserData {
  profilePicture: string;
  username: string;
  id: string;
  email: string;
}

/**
 * Custom hook to fetch and manage user data.
 *
 * @returns {UserData} The user data object containing profile picture, username, id, and email.
 */
const useUserData = (): UserData => {
  const [userData, setUserData] = useState<UserData>({
    profilePicture: "https://picsum.photos/200",
    username: "",
    id: "",
    email: "",
  });
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    fetchUserAttributes().then((attributes) => {
      setUserData((prevUserData) => ({
        profilePicture: prevUserData.profilePicture,
        username: attributes?.preferred_username ?? "",
        id: user.userId,
        email: user.signInDetails?.loginId ?? "",
      }));
    });
  }, [user]);

  return userData;
};

export default useUserData;
