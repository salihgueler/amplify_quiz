// hooks/useProfilePicture.ts
import { useState, useEffect } from "react";
import { getUrl } from "aws-amplify/storage";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

/**
 * Custom hook to fetch and manage the user's profile picture.
 *
 * @returns {string} The URL of the user's profile picture.
 */
const useProfilePicture = (): string => {
  const [profilePictureFile, setProfilePictureFile] = useState<string>(
    "https://picsum.photos/200"
  );
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    getUrl({ path: `profile-pictures/${user.userId}.png` })
      .then((result) => {
        const profileUrl = result.url.toString().trim();
        setProfilePictureFile(profileUrl);
      })
      .catch((error) => {
        console.error(error);
        setProfilePictureFile("https://picsum.photos/200");
      });
  }, []);

  return profilePictureFile;
};

export default useProfilePicture;
