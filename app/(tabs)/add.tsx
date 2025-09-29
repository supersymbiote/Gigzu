import JobCard from "@/components/JobCard";
import { profiles } from "@/constants/profiles";
import React, { useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Add = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");

  const isValid = useMemo(() => {
    return jobTitle.trim() !== "" && companyName.trim() !== "" && location.trim() !== "";
  }, [jobTitle, companyName, location]);

  const handleSubmit = () => {
    if (!isValid) {
      Alert.alert("Missing info", "Please fill Job Title, Company and Location");
      return;
    }
    Alert.alert("Job added", `${jobTitle} at ${companyName} has been added.`);
    setJobTitle("");
    setCompanyName("");
    setLocation("");
    setExperience("");
    setSalary("");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add a Job</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Job Title</Text>
          <TextInput
            value={jobTitle}
            onChangeText={setJobTitle}
            placeholder="e.g. Delivery Executive"
            placeholderTextColor="#9aa0a6"
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Company</Text>
          <TextInput
            value={companyName}
            onChangeText={setCompanyName}
            placeholder="e.g. Swiggy"
            placeholderTextColor="#9aa0a6"
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="e.g. Kochi, Kerala"
            placeholderTextColor="#9aa0a6"
            style={styles.input}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.field, styles.rowItem]}>
            <Text style={styles.label}>Experience</Text>
            <TextInput
              value={experience}
              onChangeText={setExperience}
              placeholder="e.g. 6 months"
              placeholderTextColor="#9aa0a6"
              style={styles.input}
            />
          </View>
          <View style={[styles.field, styles.rowItem]}>
            <Text style={styles.label}>Salary</Text>
            <TextInput
              value={salary}
              onChangeText={setSalary}
              placeholder="e.g. 15,000"
              placeholderTextColor="#9aa0a6"
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        </View>

        <TouchableOpacity style={[styles.button, !isValid && styles.buttonDisabled]} onPress={handleSubmit} activeOpacity={0.8} disabled={!isValid}>
          <Text style={styles.buttonText}>Add Job</Text>
        </TouchableOpacity>

        <Text style={styles.previewLabel}>Preview</Text>
        <JobCard
          profileImage={profiles.annan}
          jobTitle={jobTitle || "Job Title"}
          companyName={companyName || "Company"}
          location={location || "Location"}
          salary={salary || "Salary"}
          posterName={companyName || "Company"}
          experience={experience || "Experience"}
          onSave={() => {}}
          onPress={() => {}}
        />
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Add;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f3f4f6" },
  container: { padding: 20, rowGap: 16 },
  title: { fontSize: 24, fontWeight: "700", color: "#111" },
  field: { rowGap: 8 },
  label: { fontSize: 14, color: "#374151" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  row: { flexDirection: "row", columnGap: 12 },
  rowItem: { flex: 1 },
  button: {
    marginTop: 8,
    backgroundColor: "#2e52e7",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  previewLabel: { marginTop: 8, color: "#374151", fontWeight: "600" },
});