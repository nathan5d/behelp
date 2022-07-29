import React from "react";
import {
  VStack,
  Text,
  Button,
  IButtonProps,
  useTheme,
  useColorModeValue,
} from "native-base";

type Props = IButtonProps & {
  title: string;
  isActive?: boolean;
  type: "open" | "closed";
};
export function Filter({ title, isActive = false, type, ...rest }: Props) {
  const { colors } = useTheme();
  const colorType = type === "open" ? colors.warning[600] : colors.success[600];

  const colorText = useColorModeValue(colors.dark[100], colors.dark[600]);
  const bgButton = useColorModeValue(colors.light[100], colors.dark[50]);
  return (
    <Button
      variant={"outline"}
      borderWidth={isActive ? 1 : 0}
      borderColor={colorType}
      bg={bgButton}
      flex={1}
      size="sm"
      {...rest}
    >
      <Text
        color={isActive ? colorType : colorText}
        fontSize="xs"
        textTransform={"uppercase"}
      >
        {title}
      </Text>
    </Button>
  );
}
