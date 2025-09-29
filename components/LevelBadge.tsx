import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  level: number;
  title: string;
};

export default function LevelBadge({ level, title }: Props) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>Level {level} • {title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#2e52e7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
});







