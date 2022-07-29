import { useState } from "react";
import { useColorModeValue, useTheme, VStack } from "native-base";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Alert } from "react-native";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert("Registrar", "Preencha todos os campos");
    }

    setIsLoading(true);
    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação registrada com sucesso.");
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        return Alert.alert(
          "Solicitação",
          "Não foi possivel registrar a solicitação."
        );
      });
  }

  return (
    <VStack flex={1} bg={useColorModeValue(colors.light[50] ,colors.dark[100])}>
      <Header title="Nova Solicitação" />
      <VStack flex={1} p={6}>
        <Input
          placeholder="Número do patrimonio"
          mt={5}
          onChangeText={setPatrimony}
        />
        <Input
          placeholder="Descrição do problema"
          flex={1}
          mt={5}
          multiline
          textAlignVertical="top"
          onChangeText={setDescription}
        />
        <Button title="Cadastrar" mt={5} onPress={handleNewOrderRegister} />
      </VStack>
    </VStack>
  );
}
