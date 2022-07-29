import React, { ReactNode } from "react";
import { Box, HStack, Text, useColorModeValue, useTheme, VStack } from "native-base";
import { IconProps } from "phosphor-react-native";
import { StyleProp } from "react-native";
import { InterfaceVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";
type Props = InterfaceVStackProps &{
  title: string;
  description?: string;
  footer?: string;
  icon: React.ElementType<IconProps>;
  children?: ReactNode;
};

export function CardDetails({
  title,
  description,
  footer,
  icon: Icon,
  children,
  ...rest}: Props) {
  const { colors } = useTheme();

  return (
    <VStack bg={useColorModeValue(colors.light[100],colors.dark[50])}  p={5} mt={5} rounded="sm" 
    {...rest}>
      <HStack alignItems={"center"} mb={4}>
        <Icon color={colors.primary[500]} />
        <Text ml={2} color={useColorModeValue(colors.dark[200],colors.light[100])} fontSize={"sm"} textTransform="uppercase">
          {title}
        </Text>
      </HStack>
      {!!description && (
        <Text color={useColorModeValue(colors.dark[400],colors.light[100])} fontSize="md">
          {description}
        </Text>
      )}


      {children}

      {!!footer && (
        <Box borderTopWidth={1} borderTopColor="dark.400" mt={3}>
          <Text mt={3} color={useColorModeValue(colors.dark[400],colors.dark[300])} fontSize="sm">
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  );
}
