import React, { Component } from "react";
import { Center,Spinner, useTheme, useColorModeValue, Text } from "native-base";

export function Loading(){
    const { colors } = useTheme();
    return(
        <Center flex={1} bgColor={useColorModeValue(colors.light[50] ,colors.dark[100])}>
            <Spinner size={36} color={"primary.500"} />
            <Text mt={4}>Loading...</Text>
        </Center>
    )
}