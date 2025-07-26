import React from "react";
import { View, Linking, ScrollView } from "react-native";
import { useThemeContext } from "../../hooks/ThemeContext";
import {
  Text as PaperText,
  Button as PaperButton,
  Card,
} from "react-native-paper";

export default function Sobre() {
  const { theme } = useThemeContext();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background, padding: 24 }}
    >
      <Card
        style={{
          backgroundColor: theme.colors.surface,
          marginBottom: 24,
          borderRadius: 12,
        }}
      >
        <Card.Content>
          <PaperText
            variant="titleLarge"
            style={{ color: theme.colors.primary, marginBottom: 8 }}
          >
            Sobre o Projeto
          </PaperText>
          <PaperText
            style={{ color: theme.colors.onSurface, marginBottom: 16 }}
          >
            Este aplicativo utiliza a API pública da Steam para buscar
            informações sobre jogos, incluindo detalhes, imagens, avaliações e
            mais.
          </PaperText>
          <PaperText
            variant="titleMedium"
            style={{ color: theme.colors.primary, marginBottom: 4 }}
          >
            API Utilizada
          </PaperText>
          <PaperText style={{ color: theme.colors.onSurface, marginBottom: 8 }}>
            <PaperText style={{ fontWeight: "bold" }}>
              Steam Store API
            </PaperText>{" "}
            - Fornece dados sobre jogos, aplicativos, promoções e detalhes do
            catálogo da Steam.
          </PaperText>
          <PaperButton
            mode="outlined"
            onPress={() => Linking.openURL("https://steamapi.xpaw.me/")}
            style={{ marginBottom: 16, borderColor: theme.colors.primary }}
            labelStyle={{ color: theme.colors.primary }}
          >
            Acessar API
          </PaperButton>
          <PaperText
            variant="titleMedium"
            style={{ color: theme.colors.primary, marginBottom: 4 }}
          >
            Equipe
          </PaperText>
          <PaperText style={{ color: theme.colors.onSurface, marginBottom: 2 }}>
            Hevellyn
          </PaperText>
          <PaperText style={{ color: theme.colors.onSurface, marginBottom: 2 }}>
            Gustavo
          </PaperText>
          <PaperText style={{ color: theme.colors.onSurface, marginBottom: 2 }}>
            José Carlos Chaves
          </PaperText>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
