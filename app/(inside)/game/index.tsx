import { SteamAppDetailsResponse } from "@/interfaces/types";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import {
  ActivityIndicator as PaperActivityIndicator,
  Text as PaperText,
  IconButton,
  Button as PaperButton,
} from "react-native-paper";
import { useThemeContext } from "../../../hooks/ThemeContext";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function GameDetails() {
  const { appid } = useLocalSearchParams<{ appid: string }>();
  const { theme } = useThemeContext();
  const [loading, setLoading] = useState(false);
  const [gameDetails, setGameDetails] =
    useState<SteamAppDetailsResponse | null>(null);
  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/appdetails/${appid}`)
      .then((res) => res.json())
      .then((data) => {
        setGameDetails(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [appid]);

  const data = gameDetails?.[Number(appid)]?.data;

  if (loading) {
    return (
      <PaperActivityIndicator
        size="large"
        color={theme.colors.primary}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  if (!data) {
    return (
      <PaperText
        style={{
          color: theme.colors.error,
          textAlign: "center",
          marginTop: 32,
        }}
      >
        Game not found
      </PaperText>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <PaperText
        variant="titleLarge"
        style={{
          color: theme.colors.primary,
          width: "100%",
          textAlign: "center",
          fontSize: 32,
          fontWeight: "bold",
          padding: 16,
        }}
      >
        Detalhes do Jogo
      </PaperText>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <PaperText
          variant="headlineMedium"
          style={{
            color: theme.colors.primary,
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          {data.name}
        </PaperText>
        <Image
          source={{ uri: data.header_image }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 12,
            marginBottom: 16,
            borderWidth: 2,
            borderColor: theme.colors.primary,
          }}
        />
        <PaperText
          style={{
            color: theme.colors.onBackground,
            fontSize: 16,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          {data.short_description || "Sem descrição"}
        </PaperText>
        {/* Metacritic Score */}
        {data.metacritic && (
          <PaperText
            style={{
              color: theme.colors.secondary,
              fontWeight: "bold",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Metacritic: {data.metacritic.score}
          </PaperText>
        )}
        {/* Genres */}
        {data.genres && (
          <PaperText
            style={{
              color: theme.colors.onBackground,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Gêneros: {data.genres.map((g) => g.description).join(", ")}
          </PaperText>
        )}
        {/* Platforms */}
        {data.platforms && (
          <PaperText
            style={{
              color: theme.colors.onBackground,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Plataformas:{" "}
            {Object.entries(data.platforms)
              .filter(([k, v]) => v)
              .map(([k]) => k)
              .join(", ")}
          </PaperText>
        )}
        {/* Price */}
        {data.price_overview && (
          <PaperText
            style={{
              color: theme.colors.primary,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Preço: {data.price_overview.final_formatted}
          </PaperText>
        )}
        {/* Developers */}
        {data.developers && (
          <PaperText
            style={{
              color: theme.colors.onBackground,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Desenvolvedores: {data.developers.join(", ")}
          </PaperText>
        )}
        {/* Steam Link */}
        <PaperButton
          mode="contained"
          onPress={() =>
            Linking.openURL(`https://store.steampowered.com/app/${appid}`)
          }
          style={{ marginTop: 16, alignSelf: "center" }}
        >
          Ver na Steam
        </PaperButton>
      </ScrollView>
    </View>
  );
}
