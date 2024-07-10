// ProfileScreen.tsx
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import ProfilePicture from "./ProfilePicture";

const ProfileScreen: React.FC = () => {
  const [profilePictureFile, setProfilePictureFile] = useState<string>("");

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logout button pressed");
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      <ProfilePicture
        profilePictureFile={profilePictureFile}
        setProfilePictureFile={setProfilePictureFile}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
