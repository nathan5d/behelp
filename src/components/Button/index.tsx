import React from "react";
import {
  Button as ButtonNativeBase,
  IButtonProps,
  Heading,
  useColorModeValue,
  useTheme,
} from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, color, ...rest }: Props) {
  const { colors } = useTheme();
  return (
    <ButtonNativeBase
      {...(rest.variant === undefined && {
        bg: `${useColorModeValue(colors.primary[500], colors.primary[500])}`,
      })}
      
      h={14}
      fontSize={"sm"}
      rounded={"sm"}
      _pressed={{ bg: "green.500" }}
      {...rest}
    >
      <Heading color={color?color: colors.white} fontSize="sm">
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}
