import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import {
  Center,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ChatTeardropText, SignOut } from "phosphor-react-native";
import { Filter } from "../../components/Filter";

import { Order, OrderProps } from "../../components/Order";

import { dateFormat } from "../../utils/firestoreDateFormats";

import Logo from "../../assets/logo_secondary.svg";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { Loading } from "../../components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme();
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );

  const [orders, setOrders] = useState<OrderProps[]>([]);

  const navigation = useNavigation();
  const handleNewOrder=()=> {
    navigation.navigate("new");
  }

  const handleOpenDetails = (orderId: string) => {
    navigation.navigate("details", { orderId });
  }

  const handleLogout=()=> {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        return Alert.alert("Sair", "Não foi possivel sair");
      });
  }

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection("orders")
      .where("status", "==", statusSelected)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { patrimony, description, status, when, created_at } =
            doc.data();

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at),
          };
        });

        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg="dark.700">
      <HStack
        w={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg="dark.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.dark[300]} />}
          onPress={handleLogout}
        />
      </HStack>
      <VStack flex={1} px={6}>
        <HStack
          w={"full"}
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Heading color={"light.200"}>Solicitações</Heading>
          <Text color="light.200">{orders.length}</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order data={item} onPress={() => handleOpenDetails(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.dark[300]} size={40} />
                <Text
                  color="dark.300"
                  fontSize={"md"}
                  mt={6}
                  textAlign="center"
                >
                  Você ainda não possui {"\n"}
                  Solicitações{" "}
                  {statusSelected === "open" ? "em andamento" : "finalizadas"}
                </Text>
              </Center>
            )}
          />
        )}
        <Button title="Nova solicitação" onPress={handleNewOrder}></Button>
      </VStack>
    </VStack>
  );
}
