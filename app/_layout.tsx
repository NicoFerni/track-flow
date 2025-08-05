import Ionicons from '@react-native-vector-icons/ionicons';
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{title: 'Index', headerShown: false, href: null, tabBarStyle: { display: 'none' } }} />
        <Tabs.Screen name="home" options={{title: 'Home', headerShown: false, tabBarIcon: ({color, size}) => <Ionicons name="home" color={color} size={size} /> }} />
        <Tabs.Screen name="addJob" options={{title: 'Add job', headerShown: false, tabBarIcon: ({color, size}) => <Ionicons name="add" color={color} size={size} /> }} />
    </Tabs>
  )
}
