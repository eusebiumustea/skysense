import { memo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SearchCardAction, SearchCardIconStatus } from "../../models/ui/types";
import { shadow } from "../../ui-config/shadow";
import { Button, CheckIcon, LocateIcon } from "../assets";
interface SearchCardProps {
  initialIconState?: SearchCardIconStatus;
  onAction: (action: SearchCardAction) => boolean | void | Promise<void>;
  locationName: string;
}
export const SearchCard = memo(
  ({ initialIconState = "add", onAction, locationName }: SearchCardProps) => {
    const [iconState, setIconState] =
      useState<SearchCardIconStatus>(initialIconState);
    return (
      <View style={[shadow, styles.container]}>
        <View style={styles.locationNameView}>
          <LocateIcon />
          <Text style={styles.locationNameText}>{locationName}</Text>
        </View>
        {iconState === "add" && (
          <Button
            onPress={() => {
              setIconState("loading");
              const actionSuccessful = onAction("add");
              if (actionSuccessful === true) {
                setIconState("success");
                setTimeout(() => setIconState("open"));
              }
              if (actionSuccessful === false) {
                setIconState("add");
              }
            }}
            icon="add"
          />
        )}
        {iconState === "loading" && (
          <ActivityIndicator style={styles.activity} color={"#fff"} />
        )}
        {iconState === "open" && (
          <Button
            onPress={async () => {
              setIconState("loading");
              await onAction("open");
            }}
            icon="forward"
          />
        )}
        {iconState === "success" && <CheckIcon style={styles.activity} />}
      </View>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: "#232329",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  locationNameView: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
    maxWidth: "50%",
  },
  locationNameText: {
    color: "#fff",
    opacity: 0.7,
    fontSize: 15,
    fontWeight: "700",
  },
  activity: { paddingVertical: 4, paddingHorizontal: 6 },
});
