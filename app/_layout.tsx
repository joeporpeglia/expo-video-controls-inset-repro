import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect, useState } from "react";
import { Button, StyleSheet, View, ViewStyle } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
} from "react-native-reanimated";
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Root() {
  const [move, setMove] = useState(false);

  return <Test move={move} onToggle={() => setMove(!move)} />;
}

interface TestProps {
  move: boolean;
  onToggle: () => void;
}

function Test({ onToggle, move }: TestProps) {
  const insets = useSafeAreaInsets();
  const player = useVideoPlayer(
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    (player) => {
      player.play();
    }
  );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ paddingTop: move ? insets.top : 0 }}>
        <VideoView
          player={player}
          nativeControls
          style={{
            aspectRatio: 16 / 9,
          }}
          contentFit="contain"
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button title="Move video" onPress={onToggle} />
      </View>
    </View>
  );
}
