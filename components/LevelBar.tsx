import React from "react";
import { StyleSheet, Text, View } from "react-native";

type LevelBarProps = {
  level: number;
  title: string;
  progress: number; // 0..1 within current level
  current: number;
  next: number;
  nextTitle?: string;
};

export default function LevelBar({ level, title, progress, current, next, nextTitle }: LevelBarProps) {
  const pct = Math.max(0, Math.min(1, progress));
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.levelText}>Level {level}</Text>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct * 100}%` }]} />
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>{current} completed</Text>
        <Text style={styles.meta}>
          {next - current} to {nextTitle ? `“${nextTitle}”` : "next"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#eef2ff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#dbe3ff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  levelText: { color: "#1e3a8a", fontWeight: "800" },
  titleText: { color: "#1d4ed8", fontWeight: "700" },
  track: {
    height: 10,
    backgroundColor: "#dbe3ff",
    borderRadius: 999,
    overflow: "hidden",
  },
  fill: {
    height: 10,
    backgroundColor: "#2e52e7",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  meta: { color: "#475569", fontSize: 12, fontWeight: "600" },
});


