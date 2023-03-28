import React, { useRef, useState, useEffect, useContext } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../../infrastructure/theme/colors";
import { Button } from "react-native-paper";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

const CameraContainer = styled.View`
  width: 100%;
  height: 100%;
`;

const SnapButton = styled(TouchableOpacity).attrs({
  color: colors.brand.primary,
})`
  position: absolute;
  top: 500px;
  left: 110px;
`;

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const { user } = useContext(AuthenticationContext);

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <CameraContainer>
      <ProfileCamera
        ref={(camera) => (cameraRef.current = camera)}
        type={Camera.Constants.Type.front}
        ratio={"16:9"}
      />
      <SnapButton onPress={snap}>
        <Button mode="contained" icon="camera">
          Snap Photo
        </Button>
      </SnapButton>
    </CameraContainer>
  );
};
