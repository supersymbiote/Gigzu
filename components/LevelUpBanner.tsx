import { X } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type LevelUpBannerProps = {
  level: number;
  title: string;
  onClose: () => void;
};

export default function LevelUpBanner({ level, title, onClose }: LevelUpBannerProps) {
  return (
    <View style={styles.banner}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎉</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Level Up!</Text>
          <Text style={styles.subtitle}>You've reached Level {level} - {title}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <X size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#f0f9ff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#0ea5e9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0c4a6e",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#0369a1",
  },
  closeBtn: {
    padding: 4,
  },
});

