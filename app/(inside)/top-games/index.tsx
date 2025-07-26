import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useThemeContext } from "../../../hooks/ThemeContext";
import { Text as PaperText, Card, Button } from "react-native-paper";
import { router } from "expo-router";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

interface SteamApp {
  appid: number;
  name: string;
}

export default function TopGames() {
  const { theme } = useThemeContext();
  const [games, setGames] = useState<SteamApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopGames() {
      setLoading(true);
      setError(null);
      try {
        const appsRes = await fetch(`${BACKEND_URL}/apps?random=true`);
        const appsData = await appsRes.json();
        const apps: SteamApp[] = appsData.applist.apps;
        const limitedApps = apps.slice(0, 10);
        setGames(limitedApps);
      } catch (e: any) {
        setError(e.message || "Erro ao buscar jogos");
      } finally {
        setLoading(false);
      }
    }
    fetchTopGames();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <PaperText style={{ color: theme.colors.error }}>
          Erro: {error}
        </PaperText>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 16,
        justifyContent: "space-between",
      }}
    >
      <PaperText
        variant="titleLarge"
        style={{ color: theme.colors.primary, marginBottom: 16 }}
      >
        Jogos Recentemente Jogados
      </PaperText>
      <ScrollView>
        {games.map((game) => (
          <Button
            key={game.appid}
            onPress={() => router.push(`/game?appid=${game.appid}`)}
            style={{
              backgroundColor: theme.colors.primary,
              marginBottom: 8,
              borderRadius: 8,
              padding: 10,
              borderWidth: 1,
              borderColor: theme.colors.outline,
              width: "100%",
            }}
          >
            <PaperText
              style={{ color: theme.colors.onPrimary, fontWeight: 700 }}
            >
              {game.name}
            </PaperText>
          </Button>
        ))}
      </ScrollView>
      <Button
        onPress={() => router.push("/")}
        style={{
          backgroundColor: theme.colors.secondary,
          marginBottom: 8,
          borderRadius: 8,
          padding: 10,
          borderWidth: 1,
          borderColor: theme.colors.outline,
          width: "100%",
        }}
      >
        <PaperText style={{ color: theme.colors.onPrimary, fontWeight: 700 }}>
          Voltar para o início
        </PaperText>
      </Button>
    </View>
  );
}
