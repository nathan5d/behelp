import React from "react";
import {
  Box,
  Circle,
  HStack,
  Text,
  useTheme,
  VStack,
  Pressable,
  IPressableProps,
  useColorModeValue,
} from "native-base";
import {
  ClockAfternoon,
  Hourglass,
  CircleWavyCheck,
} from "phosphor-react-native";
import Animated, { FadeIn, FadeInDown, FadeInLeft } from "react-native-reanimated";

export type OrderProps = {
  id: string;
  patrimony: string;
  when: string;
  status: "open" | "closed";
};
type Props = IPressableProps & {
  data: OrderProps;
};

export function Order({ data, ...rest }: Props) {
  const { colors } = useTheme();
  const statusColor =
    data.status === "open" ? colors.warning[600] : colors.success[600];

  return (
    <Pressable {...rest}>
      <Animated.View entering={FadeInDown.duration(500)}>
      <HStack
        bg={useColorModeValue(colors.light[100], colors.dark[50])}
        mb={4}
        alignItems="center"
        justifyContent={"space-between"}
        rounded="sm"
        overflow={"hidden"}
      >
        <Box h="full" w={2} bg={statusColor} />
        <VStack flex={1} my={5} ml={5}>
          
            <Text
              color={useColorModeValue(colors.dark[200], colors.dark[600])}
              fontSize="md"
            >
              Patrimonio {data.patrimony}
            </Text>
            <HStack alignItems={"center"}>
              <ClockAfternoon
                size={15}
                color={useColorModeValue(colors.dark[400], colors.dark[300])}
              />
              <Text
                color={useColorModeValue(colors.dark[400], colors.dark[300])}
                fontSize={"xs"}
                ml={1}
              >
                {data.when}
              </Text>
            </HStack>
        </VStack>
        <Circle
          bg={useColorModeValue(colors.light[200], colors.dark[100])}
          h={12}
          w={12}
          mr={5}
        >
          {data.status === "closed" ? (
            <CircleWavyCheck size={24} color={statusColor} />
          ) : (
            <Hourglass size={24} color={statusColor} />
          )}
        </Circle>
      </HStack>
      </Animated.View>
    </Pressable>
  );
}
