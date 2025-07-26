import { SteamApp } from "@/interfaces/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useThemeContext } from "../../../hooks/ThemeContext";
import { Text as PaperText } from "react-native-paper";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function SteamGameSearch() {
  const { theme } = useThemeContext();
  const [allGames, setAllGames] = useState<SteamApp[]>([]);
  const [filteredGames, setFilteredGames] = useState<SteamApp[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/apps?random=false`)
      .then((res) => res.json())
      .then((data) => {
        setAllGames(data.applist.apps);
        setFilteredGames(data.applist.apps);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text === "") {
      setFilteredGames(allGames);
    } else {
      const filtered = allGames.filter((game) =>
        game.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  };

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

  return (
    <View
      style={{ flex: 1, padding: 16, backgroundColor: theme.colors.background }}
    >
      <PaperText
        variant="titleLarge"
        style={{
          color: theme.colors.primary,
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        Buscar Jogos
      </PaperText>
      <TextInput
        value={query}
        onChangeText={handleSearch}
        placeholder="Buscar jogo"
        placeholderTextColor={theme.colors.outline}
        style={{
          borderWidth: 1,
          borderColor: theme.colors.primary,
          padding: 10,
          borderRadius: 8,
          marginBottom: 16,
          color: theme.colors.onBackground,
          backgroundColor: theme.colors.elevation.level1,
        }}
      />
      <FlatList
        data={filteredGames.slice(0, 50)}
        keyExtractor={(item) => item.appid.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/game?appid=${item.appid}`)}
            style={{
              backgroundColor: theme.colors.surface,
              marginBottom: 8,
              borderRadius: 8,
              padding: 10,
              borderWidth: 1,
              borderColor: theme.colors.outline,
            }}
          >
            <PaperText style={{ color: theme.colors.onSurface }}>
              {item.name}
            </PaperText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
