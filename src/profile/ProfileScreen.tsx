import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Buffer } from "buffer";
import * as Progress from "react-native-progress";
import { getUrl, uploadData } from "aws-amplify/storage";
import { fetchUserAttributes } from "aws-amplify/auth";

interface UserData {
  profilePicture: string;
  username: string;
  id: string;
  email: string;
}

const ProfileScreen: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    profilePicture: "https://via.placeholder.com/150",
    username: "",
    id: "",
    email: "",
  });

  const [profilePictureFile, setProfilePictureFile] = useState<string>(
    "https://via.placeholder.com/150"
  );

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    fetchUserAttributes().then((attributes) => {
      setUserData((prevUserData) => ({
        ...prevUserData,
        username: attributes?.preferred_username ?? "",
        id: user.userId,
        email: user.signInDetails?.loginId ?? "",
      }));
    });
  }, [user]);

  useEffect(() => {
    getUrl({ path: `profile-pictures/${user.userId}.png` }).then((result) => {
      const profileUrl = result.url.toString();
      setProfilePictureFile(profileUrl);
      setUserData((prevUserData) => ({
        ...prevUserData,
        profilePicture: profileUrl,
      }));
    });
  }, []);

  const handleUpdateProfile = async () => {
    setUploadProgress(0);
    try {
      const fileContent = await FileSystem.readAsStringAsync(
        profilePictureFile,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );

      const buffer = Buffer.from(fileContent, "base64");

      await uploadData({
        path: `profile-pictures/${user.userId}.png`,
        data: buffer,
        options: {
          contentType: "image/png",
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              setUploadProgress((transferredBytes / totalBytes) * 100);
            }
          },
        },
      });
    } catch (err) {
      throw err;
    }
  };

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

      setUserData((prevUserData) => ({
        ...prevUserData,
        profilePicture: uri,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{ uri: userData.profilePicture }}
          style={styles.profilePicture}
          onError={(errorEvent) =>
            console.log("Error " + errorEvent.nativeEvent.error)
          }
        />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={userData.username}
          onChangeText={(text) => setUserData({ ...userData, username: text })}
          placeholder="Enter your username"
        />

        <Text style={styles.label}>ID</Text>
        <TextInput
          style={styles.input}
          value={userData.id}
          editable={false}
          placeholder="Enter your ID"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={userData.email}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
          placeholder="Enter your email"
        />
      </View>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleUpdateProfile}
      >
        <Text style={styles.searchButtonText}>Update Profile</Text>
      </TouchableOpacity>
      {uploadProgress > 0 && (
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={uploadProgress / 100}
            width={200}
            height={20}
            color="#FF6347"
          />
          <Text style={styles.progressText}>{`${uploadProgress.toFixed(
            2
          )}%`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
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
  progressContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  progressText: {
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
