import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Heading,
  HStack,
  IconButton,
  Pressable,
  StyledProps,
  useColorModeValue,
  useTheme,
  VStack,
} from "native-base";
import {
  CaretLeft,
  DotsThreeCircleVertical,
  DotsThreeVertical,
} from "phosphor-react-native";
import { Alert } from "react-native";

type Props = StyledProps & {
  title: string;
};

export function Header({ title, ...rest }: Props) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <HStack
      w={"full"}
      justifyContent="space-between"
      alignItems={"center"}
      bg={useColorModeValue(colors.light[50] ,colors.dark[100])}
      p={6}
      pt={12}
    >
      <IconButton
        bg={useColorModeValue(colors.light[50] ,colors.dark[100])}
        icon={<CaretLeft color={useColorModeValue(colors.light[700],colors.light[200])} size={24} />}
        onPress={handleGoBack}
        zIndex={1}
      />
      <Heading
        color={useColorModeValue(colors.light[700],colors.light[200])}
        textAlign="center"
        fontSize={"lg"}
        flex={1}
        px={6}
        mr={12}
        zIndex={0}
      >
        {title}
      </Heading>
    </HStack>
  );
}
