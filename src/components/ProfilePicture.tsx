// components/ProfilePicture.tsx
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import styles from "../styles";

interface ProfilePictureProps {
  profilePictureFile: string;
  setProfilePictureFile: (file: string) => void;
}

/**
 * Component to display and update the user's profile picture.
 *
 * @param {string} profilePictureFile The URL of the user's profile picture.
 * @param {Function} setProfilePictureFile A function to update the profile picture URL.
 */
const ProfilePicture: React.FC<ProfilePictureProps> = ({
  profilePictureFile,
  setProfilePictureFile,
}) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri } = result.assets[0];
      setProfilePictureFile(uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image
        source={{ uri: profilePictureFile }}
        style={styles.profilePicture}
        onError={(errorEvent) =>
          console.log(`Error ${errorEvent.nativeEvent.error}`)
        }
      />
    </TouchableOpacity>
  );
};

export default ProfilePicture;
