import React, { ReactNode } from "react";
import { Box, HStack, Text, useTheme, VStack } from "native-base";
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
    <VStack bg="dark.600" p={5} mt={5} rounded="sm" 
    {...rest}>
      <HStack alignItems={"center"} mb={4}>
        <Icon color={colors.primary[700]} />
        <Text ml={2} color="dark.300" fontSize={"sm"} textTransform="uppercase">
          {title}
        </Text>
      </HStack>
      {!!description && (
        <Text color="light.100" fontSize="md">
          {description}
        </Text>
      )}


      {children}

      {!!footer && (
        <Box borderTopWidth={1} borderTopColor="dark.400" mt={3}>
          <Text mt={3} color="dark.300" fontSize="sm">
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  );
}
