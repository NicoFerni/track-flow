import { StyleSheet, View } from "react-native";


export const FloatingOrb = ({ style }: { style?: object }) => (
    <View style={[styles.orb, style]} />
  );

  const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
})