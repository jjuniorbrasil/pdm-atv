import { SteamAppDetailsResponse } from "@/interfaces/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function GameDetails() {
  const { appid } = useLocalSearchParams<{ appid: string }>();
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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!gameDetails) {
    return <Text>Game not found</Text>;
  }

  return (
    <View>
      <Text>{gameDetails[Number(appid)].data?.name}</Text>
      <Image
        source={{ uri: gameDetails[Number(appid)].data?.header_image }}
        style={{ width: "100%", height: 200 }}
      />
    </View>
  );
}
