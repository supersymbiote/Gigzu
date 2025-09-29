// app/index.tsx
import JobCard from "@/components/JobCard";
import { icons } from "@/constants/icons";
import { profiles } from "@/constants/profiles";
import { addSavedJob } from "@/utils/savedJobs";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const jobs = [
    { id: "1", profileImage: profiles.annan, jobTitle: "Catering Boy", companyName: "EventX Services", location: "Kochi, Edappilly", experience: "0 months", salary: "999" },
    { id: "2", profileImage: profiles.john, jobTitle: "Delivery Executive", companyName: "Swiggy", location: "Kochi, Kerala", experience: "6 months", salary: "15,000" },
    { id: "3", profileImage: profiles.cj, jobTitle: "Plumber", companyName: "LocalFix", location: "Ernakulam", experience: "1 year", salary: "12,000" },
    { id: "4", profileImage: profiles.bateman, jobTitle: "Electrician", companyName: "QuickServe", location: "Thrissur", experience: "2 years", salary: "18,000" },
    { id: "5", profileImage: profiles.mrbean, jobTitle: "Painter", companyName: "BrightHomes", location: "Aluva", experience: "3 months", salary: "10,000" },
  ];

  // ✅ Apply filtering logic
  const filteredJobs = jobs.filter(
    (job) =>
      job.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar style="light" backgroundColor="#000"/>
      {/* Header + Search */}
      <View style={styles.headerStack}>
        <View style={styles.header}>
          <Text style={styles.logo}>Gigzu</Text>
          <Image source={icons.person} style={styles.headerIcon} />
          <Text style={styles.tag}>Your job hunt starts here...</Text>
        </View>
        <View style={styles.searchWrapper}>
          <View style={styles.searchBox}>
            <Image source={icons.search} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search jobs..."
              placeholderTextColor="#9aa0a6"
              value={search}
            onChangeText={setSearch}
            underlineColorAndroid="transparent"
            />
          </View>
        </View>
      </View>

      {/* Job Cards list */}
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              profileImage={job.profileImage}
              jobTitle={job.jobTitle}
              companyName={job.companyName}
              location={job.location}
              salary={job.salary}
              posterName={job.companyName}
              experience={job.experience}
              onSave={() => {
                addSavedJob({
                  id: job.id,
                  profileImage: job.profileImage,
                  jobTitle: job.jobTitle,
                  companyName: job.companyName,
                  location: job.location,
                  salary: job.salary,
                  posterName: job.companyName,
                  experience: job.experience,
                });
              }}
              onPress={() =>
                router.push({
                  pathname: "/Jobs/[id]",
                  params: {
                    id: job.id,
                    title: job.jobTitle,
                    company: job.companyName,
                    location: job.location,
                    salary: job.salary,
                    experience: job.experience,
                  },
                })
              }
            />
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 40, color: "#777" }}>
            No jobs found
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f3f4f6" },
  headerStack: {
    position: "relative",
    paddingBottom: 72,
  },
  header: {
    backgroundColor: "#000",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 32,
    position: "relative",
  },
  logo: { color: "white", fontSize: 32, fontWeight: "700" },
  headerIcon: {
    width: 26,
    height: 26,
    tintColor: "white",
    position: "absolute",
    right: 20,
    top: 28,
  },
  tag: { color: "white", marginTop: 8, fontSize: 16 },
  searchWrapper: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: -10,
    zIndex: 2,
    elevation: 3,
  },
  searchBox: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    elevation: 4,
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: { width: 18, height: 18, tintColor: "#888", marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: "#222" },
  list: {
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 60,
    rowGap: 20,
  },
});
