import { Bookmark, Briefcase, Clock, IndianRupee, MapPin } from "lucide-react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type JobCardProps = {
  profileImage: any;
  posterName: string;
  jobTitle: string;
  companyName: string;
  location: string;
  salary: string;            // 👈 new prop for wage
  experience: string; 
  onPress: () => void;
  onSave: () => void;
};

export default function JobCard({
  profileImage,
  posterName,
  jobTitle,
  companyName,
  location,
  salary,                     // 👈 include wage
  experience,
  onPress,
  onSave
}: JobCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {/* Profile + Bookmark */}
      <View style={styles.headerRow}>
        <View style={styles.profileWrapper}>
          <View style={styles.blueCircle}>
            <Image source={profileImage} style={styles.profileImage} />
          </View>
          <Text style={styles.posterName}>{posterName}</Text>
        </View>
        <TouchableOpacity onPress={onSave} activeOpacity={0.7}>
          <Bookmark size={22} color="#2e52e7" />
        </TouchableOpacity>
      </View>

      {/* Job Title */}
      <Text style={styles.jobTitle}>{jobTitle}</Text>

      {/* Company */}
      <View style={styles.row}>
        <Briefcase size={18} color="#555" />
        <Text style={styles.company}>{companyName}</Text>
      </View>

      {/* Location */}
      <View style={styles.row}>
        <MapPin size={18} color="#555" />
        <Text style={styles.location}>{location}</Text>
      </View>

      {/* Experience */}
      <View style={styles.row}>
        <Clock size={16} color="#555" />
        <Text style={styles.experience}>{experience}</Text>
      </View>

      {/* Salary */}
      <View style={styles.row}>
        <IndianRupee size={16} color="#555" />
        <Text style={styles.salary}>{salary}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  blueCircle: {
    backgroundColor: "#2e52e7",
    borderRadius: 999,
    padding: 4,
    marginRight: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  posterName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  company: {
    marginLeft: 6,
    fontSize: 14,
    color: "#555",
  },
  location: {
    marginLeft: 6,
    fontSize: 14,
    color: "#777",
  },
  experience: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#555", // green highlight for experience
  },
  salary: {
    marginLeft: 6,
    fontSize: 18,
    fontWeight: "800",
    color: "#2e52e7", // blue highlight for salary
  },
});
