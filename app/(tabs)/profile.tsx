import LevelBadge from "@/components/LevelBadge";
import { calculateLevel } from "@/utils/level";
import { getSavedJobs } from "@/utils/savedJobs";
import { StatusBar } from "expo-status-bar";
import { Calendar, ChevronRight, Mail, MapPin, Phone, Star } from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [completedCount, setCompletedCount] = useState(0);
  useEffect(() => {
    (async () => {
      const jobs = await getSavedJobs();
      const count = jobs.filter((j) => (j.status ?? (j.completed ? "completed" : "active")) === "completed").length;
      setCompletedCount(count);
    })();
  }, []);

  const levelInfo = useMemo(() => calculateLevel(completedCount), [completedCount]);
  const aboutText =
    "Passionate Product Designer focused on crafting intuitive experiences across mobile and web. I enjoy collaborating with cross-functional teams and turning insights into elegant solutions.";

  const topSkills = [
    "Product Design",
    "User Research",
    "Wireframing",
    "Prototyping",
    "Design Systems",
    "Figma",
  ];

  const experiences = [
    {
      role: "Senior Product Designer",
      company: "NovaTech",
      dateRange: "Jan 2023 - Present · 2 yrs",
      location: "Remote",
      summary:
        "Led end-to-end design for the B2B analytics suite; shipped a new onboarding that increased activation by 18%.",
    },
    {
      role: "Product Designer",
      company: "Orbit Labs",
      dateRange: "Aug 2020 - Dec 2022 · 2 yrs 5 mos",
      location: "Lagos, Nigeria",
      summary:
        "Owned mobile IA and pattern library; partnered with engineering to reduce design-dev drift and improve velocity.",
    },
  ];

  const reviews = [
    {
      id: "r1",
      name: "Anita Joseph",
      rating: 5,
      date: "Aug 2025",
      text:
        "Melissa was punctual and very professional. Completed the task faster than expected!",
    },
    {
      id: "r2",
      name: "Rahul Menon",
      rating: 4,
      date: "Jul 2025",
      text:
        "Great communication and quality work. Would definitely hire again.",
    },
    {
      id: "r3",
      name: "Sofia Daniel",
      rating: 5,
      date: "Jun 2025",
      text:
        "Went above and beyond to ensure everything was perfect. Highly recommended!",
    },
  ];
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar style="dark" />
      <ScrollView style={styles.container}
          showsVerticalScrollIndicator={false}>
      {/* Cover Photo */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        }}
        style={styles.coverPhoto}
      />

      {/* Profile + Name Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={require("../../assets/profiles/john.jpg")}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.nameSection}>
          <Text style={styles.profileName}>Melissa Peters</Text>
          <View style={{ height: 6 }} />
          <LevelBadge level={levelInfo.level} title={levelInfo.title} />
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bodyText}>{aboutText}</Text>
      </View>

      {/* Contact Info */}
      <View style={styles.contactSection}>
        <View style={styles.contactRow}>
          <View style={styles.contactLeft}>
            <Mail size={20} color="#111" />
            <Text style={styles.contactText}>melissapeters333@gmail.com</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.contactRow}>
          <View style={styles.contactLeft}>
            <Phone size={20} color="#111" />
            <Text style={styles.contactText}>9377683245</Text>
          </View>
          <ChevronRight size={18} color="#111" />
        </TouchableOpacity>

        <View style={styles.contactRow}>
          <View style={styles.contactLeft}>
            <MapPin size={20} color="#111" />
            <Text style={styles.contactText}>Lagos, Nigeria</Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Top Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Skills</Text>
        <View style={styles.pillWrap}>
          {topSkills.map((skill) => (
            <View key={skill} style={styles.pill}>
              <Text style={styles.pillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {experiences.map((exp, idx) => (
          <View key={idx} style={[styles.expCard, idx > 0 && { marginTop: 14 }]}>
            <Text style={styles.expRole}>{exp.role}</Text>
            <Text style={styles.expCompany}>{exp.company}</Text>
            <View style={styles.expMetaRow}>
              <Calendar size={16} color="#666" />
              <Text style={styles.expMetaText}>{exp.dateRange}</Text>
            </View>
            <View style={styles.expMetaRow}>
              <MapPin size={16} color="#666" />
              <Text style={styles.expMetaText}>{exp.location}</Text>
            </View>
            <Text style={styles.expSummary}>{exp.summary}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {reviews.map((rev) => (
          <View key={rev.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewName}>{rev.name}</Text>
              <Text style={styles.reviewDate}>{rev.date}</Text>
            </View>
            <View style={styles.starsRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  color={i < rev.rating ? "#f59e0b" : "#d1d5db"}
                  fill={i < rev.rating ? "#f59e0b" : "none"}
                />
              ))}
            </View>
            <Text style={styles.reviewText}>{rev.text}</Text>
          </View>
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  coverPhoto: {
    width: "100%",
    height: 140,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  profileSection: {
    alignItems: "flex-start",
    marginTop: -45,
    paddingHorizontal: 16,
  },
  nameSection: {
    alignItems: "flex-start",
    marginTop: 8,
  },
  profileImageWrapper: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  profileName: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    textAlign: "left",
  },
  about: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    textAlign: "center",
  },
  contactSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  contactLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#e6e6e6",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 6,
    marginTop: 10,
  },
  bodyText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  placeholder: {
    fontSize: 14,
    color: "#888",
  },
  pillWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  pillText: {
    fontSize: 13,
    color: "#111",
  },
  expCard: {
    paddingVertical: 6,
  },
  expRole: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  expCompany: {
    marginTop: 2,
    fontSize: 14,
    color: "#333",
  },
  expMetaRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  expMetaText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#666",
  },
  expSummary: {
    marginTop: 8,
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },
  reviewDate: {
    fontSize: 12,
    color: "#6b7280",
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  reviewText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
});


