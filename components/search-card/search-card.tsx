import { MotiPressable as Pressable } from "moti/interactions";
import { memo, useMemo, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Gesture } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SearchCardAction, SearchCardIconStatus } from "../../models/ui/types";
import { AddIcon, ArrowForwardIcon, DeleteIcon, LocateIcon } from "../assets";
import { DetectGesture } from "../gesture-detector";
type SearchCardProps =
  | {
      initialIconState?: SearchCardIconStatus;
      onAction: (action: SearchCardAction) => boolean | void | Promise<void>;
      locationName: string;
      enableDelete?: undefined | false;
      onDelete?: never;
    }
  | {
      initialIconState?: SearchCardIconStatus;
      onAction: (action: SearchCardAction) => boolean | void | Promise<void>;
      locationName: string;
      enableDelete: true;
      onDelete: () => void;
    };

const MotiPressable = Animated.createAnimatedComponent(Pressable);
const spring = {
  damping: 10, // Controls the 'bounciness'
  stiffness: 90, // Higher = more stiff
  mass: 0.1, // Simulates the "weight" of the object
  overshootClamping: false, // If true, prevents the animation from overshooting the target value
  restDisplacementThreshold: 0.01, // The minimum distance to the target value before the animation stops
  restSpeedThreshold: 0.01, // The minimum speed at which the animation is considered "stopped"
};
export const SearchCard = memo(
  ({
    initialIconState = "add",
    onAction,
    locationName,
    enableDelete = false,
    onDelete,
  }: SearchCardProps) => {
    const [iconState, setIconState] =
      useState<SearchCardIconStatus>(initialIconState);
    const { width } = useWindowDimensions();
    const moveX = useSharedValue(0);
    const animatedOverlay = useSharedValue(0);
    const validateEnableDelete = iconState !== "loading" && enableDelete;

    const gesture = useMemo(
      () =>
        validateEnableDelete &&
        Gesture.Pan()
          .failOffsetY([-5, 5])
          .activeOffsetX([-5, 5])
          .onUpdate((e) => {
            moveX.value = Math.min(Math.max(0, e.translationX), width);
            if (e.translationX >= 170) {
              animatedOverlay.value = withSpring(1, spring);
            } else {
              animatedOverlay.value = withSpring(0, spring);
            }
          })
          .onEnd((e) => {
            if (e.translationX >= 170) {
              moveX.value = withTiming(width * 2.5, { duration: 300 });
              animatedOverlay.value = withSpring(0, spring);
              runOnJS(onDelete || function () {})();
            } else {
              moveX.value = withTiming(0, { duration: 150 });
            }
          }),
      []
    );
    const animatedPressableStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: interpolate(moveX.value, [0, width], [0, width / 2.3]) },
      ],
    }));
    const animatedOverlayStyle = useAnimatedStyle(() => ({
      opacity: interpolate(animatedOverlay.value, [0, 1], [0, 1]),
      transform: [
        {
          translateX: interpolate(animatedOverlay.value, [0, 1], [-100, -36]),
        },
      ],
    }));

    return (
      <View>
        {validateEnableDelete && (
          <Animated.View style={[styles.overlay, animatedOverlayStyle]}>
            <DeleteIcon
              width={40}
              height={40}
              style={{ alignSelf: "center" }}
            />
            <Text>Remove</Text>
          </Animated.View>
        )}
        <DetectGesture enabled={validateEnableDelete} gesture={gesture}>
          <MotiPressable
            transition={{ type: "timing", duration: 190 }}
            animate={useMemo(
              () =>
                ({ pressed }) => {
                  "worklet";
                  return {
                    backgroundColor: pressed ? `#32323b` : "#232329",
                  };
                },
              []
            )}
            onPress={() => {
              if (moveX.value === 0) {
                if (iconState === "add") {
                  setIconState("loading");
                  const actionSuccessful = onAction("add");
                  if (actionSuccessful === true) {
                    setIconState("open");
                  }
                  if (actionSuccessful === false) {
                    setIconState("add");
                  }
                }
                if (iconState === "open") {
                  setIconState("loading");
                  onAction("open");
                }
              }
            }}
            style={[styles.container, animatedPressableStyle]}
          >
            <View style={styles.locationNameView}>
              <LocateIcon />
              <Text style={styles.locationNameText}>{locationName}</Text>
            </View>
            {iconState === "add" && <AddIcon />}
            {iconState === "loading" && (
              <ActivityIndicator
                style={styles.activity}
                size={24}
                color={"#fff"}
              />
            )}
            {iconState === "open" && <ArrowForwardIcon />}
          </MotiPressable>
        </DetectGesture>
      </View>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: `rgba(35, 35, 41, 1)`,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 85,
  },
  locationNameView: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
    maxWidth: "80%",
  },
  locationNameText: {
    color: "#fff",
    opacity: 0.7,
    fontSize: 15,
    fontWeight: "700",
  },
  activity: { paddingVertical: 4, paddingHorizontal: 6 },
  overlay: {
    backgroundColor: "yellow",
    zIndex: -2,
    width: 132,
    height: 85,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
    left: 0,
  },
});
