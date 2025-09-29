import JobCard from "@/components/JobCard";
import LevelBar from "@/components/LevelBar";
import LevelUpBanner from "@/components/LevelUpBanner";
import { calculateLevel } from "@/utils/level";
import { getSavedJobs, removeSavedJob, SavedJob } from "@/utils/savedJobs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Saved = () => {
  const [items, setItems] = useState<SavedJob[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<"active" | "applied" | "completed">("active");
  const [lastLevel, setLastLevel] = useState<number | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  const load = useCallback(async () => {
    const list = await getSavedJobs();
    setItems(list);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const levelInfo = useMemo(() => {
    const completedCount = items.filter((j) => (j.status ?? (j.completed ? "completed" : "active")) === "completed").length;
    return calculateLevel(completedCount);
  }, [items]);

  // Detect level-ups: load last level from storage, compare and persist
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("@user_level_last");
        setLastLevel(raw ? Number(raw) : null);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    if (lastLevel == null) return;
    if (levelInfo.level > lastLevel) {
      setShowBanner(true);
      AsyncStorage.setItem("@user_level_last", String(levelInfo.level));
    }
  }, [levelInfo.level, lastLevel]);

  const filtered = useMemo(() => {
    return items.filter((j) => (j.status ?? (j.completed ? "completed" : "active")) === selectedStatus);
  }, [items, selectedStatus]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Saved Jobs</Text>
        {showBanner && (
          <LevelUpBanner
            level={levelInfo.level}
            title={levelInfo.title}
            onClose={() => setShowBanner(false)}
          />
        )}
        {/* Level Bar */}
        <LevelBar
          level={levelInfo.level}
          title={levelInfo.title}
          progress={levelInfo.progress}
          current={levelInfo.completedCount}
          next={levelInfo.nextLevelAt}
          nextTitle={levelInfo.nextTitle}
        />
        {/* Segmented control */}
        <View style={styles.segmentedContainer}>
          {[
            { key: "active", label: "Active" },
            { key: "applied", label: "Applied" },
            { key: "completed", label: "Completed" },
          ].map(({ key, label }) => {
            const isSelected = selectedStatus === (key as any);
            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.8}
                onPress={() => setSelectedStatus(key as any)}
                style={[styles.segmentButton, isSelected && styles.segmentButtonActive]}
              >
                <Text style={[styles.segmentText, isSelected && styles.segmentTextActive]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {filtered.length === 0 ? (
          <Text style={styles.empty}>No {selectedStatus} jobs.</Text>
        ) : (
          filtered.map((job) => (
            <JobCard
              key={job.id}
              profileImage={job.profileImage}
              jobTitle={job.jobTitle}
              companyName={job.companyName}
              location={job.location}
              salary={job.salary}
              posterName={job.posterName}
              experience={job.experience}
              onSave={async () => {
                await removeSavedJob(job.id);
                load();
              }}
              onPress={() => {}}
            />
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Saved;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 20, rowGap: 16 },
  title: { fontSize: 24, fontWeight: "700", color: "#111", marginBottom: 8 },
  section: { fontSize: 16, fontWeight: "700", color: "#374151", marginTop: 8 },
  segmentedContainer: {
    flexDirection: "row",
    backgroundColor: "#eef2ff",
    padding: 4,
    borderRadius: 999,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  segmentButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "transparent",
  },
  segmentButtonActive: {
    backgroundColor: "#2e52e7",
  },
  segmentText: {
    color: "#1f2937",
    fontWeight: "600",
  },
  segmentTextActive: {
    color: "#ffffff",
  },
  empty: { color: "#6b7280", textAlign: "center", marginTop: 40 },
});