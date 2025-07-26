import { router } from "expo-router";
import { View, Image, StyleSheet, Switch } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import { useThemeContext } from "../hooks/ThemeContext";

export default function Home() {
  const { theme, isDark, setIsDark } = useThemeContext();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.themeSwitchContainer}>
        <Text style={[theme.fonts.bodyLarge, { color: theme.colors.primary }]}>
          Tema:{" "}
        </Text>
        <Switch value={isDark} onValueChange={() => setIsDark(!isDark)} />
      </View>
      <Image
        source={require("../assets/images/banner.png")}
        style={{
          width: "100%",
          height: 200,
          marginBottom: 24,
          borderRadius: 16,
          borderWidth: 2,
          borderColor: theme.colors.primary,
        }}
      />
      <Text
        variant="headlineLarge"
        style={{
          color: theme.colors.primary,
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        NativePlay
      </Text>
      <Text
        variant="titleMedium"
        style={{
          color: theme.colors.secondary,
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        Descubra, busque e explore jogos de forma rápida e fácil!
      </Text>
      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          onPress={() => router.push("/top-games")}
          style={styles.button}
        >
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onPrimary, fontWeight: "bold" }}
          >
            Listar Jogos
          </Text>
        </Button>
        <Button
          mode="contained"
          onPress={() => router.push("/search")}
          style={styles.button}
        >
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onPrimary, fontWeight: "bold" }}
          >
            Buscar
          </Text>
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.push("/(inside)/sobre")}
          style={[styles.button, { borderColor: theme.colors.primary }]}
        >
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.primary, fontWeight: "bold" }}
          >
            Sobre
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  themeSwitchContainer: {
    position: "absolute",
    top: 32,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    zIndex: 100,
  },
  buttonsContainer: {
    width: "100%",
    gap: 12,
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
    width: "100%",
    borderRadius: 8,
  },
});
