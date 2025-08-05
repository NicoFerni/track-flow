import { StyleSheet, Text, View } from "react-native";
import { DetailRowProps } from "../core/interfaces";

export default function DetailRow({ label, value }: DetailRowProps) {
  if (!value) return null;

  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    minWidth: 120,
  },
  detailValue: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
});