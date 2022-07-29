import { useEffect, useState } from "react";
import { Alert, Pressable } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import {
  Center,
  ColorMode,
  Divider,
  FlatList,
  HamburgerIcon,
  Heading,
  HStack,
  IconButton,
  Menu,
  StorageManager,
  Text,
  useColorMode,
  useColorModeValue,
  useTheme,
  VStack,
} from "native-base";
import {
  ChatTeardropText,
  SignOut,
  Swatches,
  DotsThreeVertical,
  Equals,
  List,
  ChatText,
  Sun,
  Moon,
} from "phosphor-react-native";

import { dateFormat } from "../../utils/firestoreDateFormats";

import Logo from "../../assets/be_logo_secondary.svg";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { Filter } from "../../components/Filter";
import { Order, OrderProps } from "../../components/Order";
import { Loading } from "../../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeIn, FadeInLeft, FadeInUp } from "react-native-reanimated";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme();
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );

  const [orders, setOrders] = useState<OrderProps[]>([]);

  const navigation = useNavigation();
  const handleNewOrder = () => {
    navigation.navigate("new");
  };

  const handleOpenDetails = (orderId: string) => {
    navigation.navigate("details", { orderId });
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .catch((error) => {
        //console.log(error);
        return Alert.alert("Sair", "Não foi possivel sair");
      });
  };

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

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack
      flex={1}
      pb={6}
      bg={useColorModeValue(colors.light[50], colors.dark[100])}
    >
      <HStack
        w={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={useColorModeValue(colors.light[50], colors.dark[100])}
        pt={12}
        pb={5}
        px={6}
      >
        <Animated.View entering={FadeIn.duration(500)}>
          <Logo textAnchor="start" />
        </Animated.View>

        <Menu
          w={190}
          mr={6}
          mt={2}
          trigger={(triggerProps) => {
            return (
              <IconButton
                {...triggerProps}
                icon={
                  <List
                    size={26}
                    color={
                      colorMode === "dark"
                        ? colors.light[400]
                        : colors.dark[300]
                    }
                  />
                }
              />
            );
          }}
        >
          <Menu.Group title="Theme">
            <Menu.Item>
              <Pressable onPress={toggleColorMode}>
                <HStack alignItems={"center"} justifyContent={"space-between"}>
                  <Text>{useColorModeValue("Dark Mode", "Light Mode")}</Text>
                  <IconButton
                    icon={
                      colorMode === "dark"
                      ?  <Sun size={22} color={colors.primary[500]} />
                      :  <Moon size={22} color={colors.primary[500]} />
                     }
                    onPress={toggleColorMode}
                  />
                </HStack>
              </Pressable>
            </Menu.Item>
          </Menu.Group>
          <Divider mt="3" w="100%" />
          <Menu.Group title="Account">
            <Menu.Item>
              <Pressable onPress={handleLogout}>
                <HStack alignItems={"center"} justifyContent={"space-between"}>
                  <Text>Sair</Text>
                  <IconButton
                    icon={<SignOut size={22} color={colors.primary[500]} />}
                    onPress={handleLogout}
                  />
                </HStack>
              </Pressable>
            </Menu.Item>
          </Menu.Group>
        </Menu>
      </HStack>
      <VStack flex={1} px={6}>
        <HStack
          w={"full"}
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Heading
            color={useColorModeValue(colors.light[700], colors.light[200])}
          >
            Solicitações
          </Heading>
          <Text color={useColorModeValue(colors.light[700], colors.light[200])}>
            {orders.length}
          </Text>
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
            title="finalizadas"
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
                <ChatText color={colors.dark[300]} size={40} />
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
