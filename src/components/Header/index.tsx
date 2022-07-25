import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Heading,
  HStack,
  IconButton,
  Pressable,
  StyledProps,
  useTheme,
  VStack,
} from "native-base";
import { CaretLeft, DotsThreeCircleVertical, DotsThreeVertical } from "phosphor-react-native";
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
      bg={"dark.600"}
      p={6}
      pt={12}
    >
      <IconButton
        icon={<CaretLeft color={colors.light[200]} size={24} />}
        onPress={handleGoBack}
        zIndex={1}
      />
      <Heading
        color={"light.200"}
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
