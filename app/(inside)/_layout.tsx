import { router, Stack } from "expo-router";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useThemeContext } from "../../hooks/ThemeContext";

export default function InsideLayout() {
  const { theme } = useThemeContext();

  return (
    <View style={{ flex: 1 }}>
      {/* Superior bar appears on every page */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          backgroundColor: theme.colors.elevation.level2,
        }}
      >
        <IconButton
          icon="arrow-left"
          size={28}
          onPress={() => router.replace("/")}
          style={{ marginRight: 8 }}
          iconColor={theme.colors.primary}
        />
        <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
          NativePlay
        </Text>
      </View>
      {/* All (inside) pages rendered here */}
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
