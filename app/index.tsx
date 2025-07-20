import * as React from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function Index() {
  const [text, setText] = React.useState("");

  return (
    <View style={{ padding: 20 }}>
      <Text variant="titleLarge">Bem-vindo!</Text>
      <TextInput
        label="Digite algo"
        value={text}
        onChangeText={setText}
        mode="outlined"
        style={{ marginTop: 16 }}
      />
      <Button
        mode="contained"
        onPress={() => console.log("Enviado")}
        style={{ marginTop: 16 }}
      >
        Enviar
      </Button>
    </View>
  );
}
