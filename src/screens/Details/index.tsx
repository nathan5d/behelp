import React from "react";
import { VStack, Text, HStack, useTheme, ScrollView } from "native-base";

import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { OrderProps } from "../../components/Order";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { OrderFireBaseDTO } from "../../DTOs/OrderDTO";
import { dateFormat } from "../../utils/firestoreDateFormats";
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard,
  ClipboardText,
} from "phosphor-react-native";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { CardDetails } from "../../components/CardDetails";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Alert } from "react-native";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};
export default function Details() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const [solution, setSolution] = useState("");
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  const { colors } = useTheme();

  function handleOrderClose(){
    if(!solution){
      return Alert.alert('Solicitação', 'Informe a solução')
    }

    firestore()
    .collection<OrderFireBaseDTO>('orders')
    .doc(orderId)
    .update({
      status:'closed',
      solution,
      closed_at:firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Solicitação', 'Solicitação encerrada');
      navigation.goBack();
    })
    .catch(err => {
      Alert.alert(err)
    });
  }

  useEffect(() => {
    firestore()
      .collection<OrderFireBaseDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, solution, created_at, closed_at } =
          doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
        });

        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <VStack flex={1} bg="dark.700">
      <Header title="Detalhes" />
      <HStack bg={"dark.500"} justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}
        <Text
          fontSize={"sm"}
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === "closed" ? "finalizado" : "em andamento"}
        </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
       
        <CardDetails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
         
        />

        <CardDetails
          title="descrição do problema"
          description={order.description}
          icon={ClipboardText}
          footer={`Registrado em ${order.when}`}
        />

        <CardDetails
          title="solução"
          description={order.solution}
          icon={CircleWavyCheck}
          footer={order.closed && `Encerrado em ${order.closed}`}
        
        >
          {
            order.status ==='open' &&
          
          <Input
            placeholder="Descrição da solução"
            onChangeText={setSolution}
            textAlignVertical="top"
            bg={"dark.700"}
            _focus={{
              bg: "dark.700",
            }}
            multiline
            h={24}
            mt={4}
          />
        }
        </CardDetails>
        
      </ScrollView>
      {order.status==='open' && <Button title="Encerrar solicitação" m={5} onPress={handleOrderClose} />}
    </VStack>
  );
}
