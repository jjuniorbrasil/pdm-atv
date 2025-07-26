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

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function SteamGameSearch() {
  const [allGames, setAllGames] = useState<SteamApp[]>([]);
  const [filteredGames, setFilteredGames] = useState<SteamApp[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/apps`)
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

  const getGameDetails = async (appid: number) => {
    try {
      const res = await fetch(`${BACKEND_URL}/appdetails/${appid}`);
      const data = await res.json();
      alert(
        JSON.stringify(data[appid]?.data?.short_description || "Sem descrição")
      );
    } catch {
      alert("Erro ao buscar detalhes");
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        value={query}
        onChangeText={handleSearch}
        placeholder="Buscar jogo"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          borderRadius: 8,
          marginBottom: 16,
        }}
      />
      <FlatList
        data={filteredGames.slice(0, 50)}
        keyExtractor={(item) => item.appid.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/game?appid=${item.appid}`)}
          >
            <Text style={{ padding: 8 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
