import React from "react";
import { Input as NativeBaseInput, IInputProps, useColorModeValue, useTheme } from "native-base";

export function Input({ ...rest }: IInputProps) {
  const { colors } = useTheme();
  return (
    <NativeBaseInput
    
      h={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily={"body"}
      placeholderTextColor={useColorModeValue(colors.light[900],colors.dark[500])}
      _focus={{
        borderWidth: 1,
        borderColor: "primary.100",
        bg: `${useColorModeValue(colors.light[200],colors.dark[100])}`,
           
      }}
      bg={useColorModeValue(colors.light[100],colors.dark[50])}
       
      {...rest}
    />
  );
}
