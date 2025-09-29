import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Briefcase, Clock, IndianRupee, MapPin } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function JobDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Details</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Info */}
      <View style={styles.infoCard}>
        <Text style={styles.title}>{String(params.title ?? '')}</Text>
        <View style={styles.row}><Briefcase size={18} color="#555" /><Text style={styles.text}>{String(params.company ?? '')}</Text></View>
        <View style={styles.row}><MapPin size={18} color="#555" /><Text style={styles.text}>{String(params.location ?? '')}</Text></View>
        <View style={styles.row}><Clock size={16} color="#555" /><Text style={styles.text}>{String(params.experience ?? '')}</Text></View>
        <View style={styles.row}><IndianRupee size={16} color="#555" /><Text style={styles.salary}>{String(params.salary ?? '')}</Text></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f3f4f6' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 6,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    rowGap: 6,
  },
  title: { fontSize: 20, fontWeight: '800', color: '#111', marginBottom: 4 },
  row: { flexDirection: 'row', alignItems: 'center' },
  text: { marginLeft: 8, color: '#444', fontSize: 14 },
  salary: { marginLeft: 8, color: '#2e52e7', fontSize: 18, fontWeight: '800' },
});