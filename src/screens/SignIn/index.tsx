import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Platform, Pressable } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  Heading,
  Icon,
  useTheme,
  PresenceTransition,
  Slide,
  FormControl,
  WarningOutlineIcon,
  useColorModeValue,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import Logo from "../../assets/be_logo_primary.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Controller, useForm } from "react-hook-form";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

type ErrorProps = {
  email: string;
  password: string;
};
export default function SignIn() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState<ErrorProps>({} as ErrorProps);

  const validateEmail = () => {

    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(email) === false) {
      setErrors({ ...errors, email: "Email inválido." });
      return false;
    } else if (email === "") {
      setErrors({ ...errors, email: "Email é obrigatório." });
      return false;
    } else {
      setErrors({ ...errors, email: "" });
      return true;
    }
    return true;
  };
  const validatePassword = () => {
    if (password === "") {
      setErrors({ ...errors, password: "Você precisa definir uma senha." });
      return false;
    } else if (password.length < 3) {
      setErrors({ ...errors, password: "A senha é muito curta." });
      return false;
    } else {
      setErrors({ ...errors, password: "" });
      return true;
    }

    return true;
  };

  const clearErrors = () => {
    setErrors({
      ...errors,
      email: "",
      password: "",
    });
  };
  const handleEmail = (_email) => {
    clearErrors();
    setEmail(_email);
    validateEmail();
  };
  const handlePassword = (_password) => {
    clearErrors();
    setPassword(_password);
    validatePassword();
  };

  /*const onSubmit = () => {
    validateEmail();
    validatePassword();
  };*/

  const handleGoToRegister = () => {
    //navigation.navigate("login");
  };
  const handleSignIn = () => {

    if(!email || !password){
      setErrors({ ...errors, password: "Preencha todos os campos." });
      return false;
    }
    //onSubmit();
    if (validateEmail() && validatePassword() === false) {
      
       return false;
     }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        if (error.code === "auth/invalid-email") {
          setErrors({
            ...errors,
            email: "Email inválido",
          });
          return;
        }
        if (error.code === "auth/wrong-password") {
          setErrors({
            ...errors,
            password: "Email ou senha inválido",
          });
          return;
        }
        if (error.code === "auth/user-not-found") {
          setErrors({
            ...errors,
            password: "Email ou senha inválido",
          });
          return;
        }
        setErrors({
          ...errors,
          password: "Não foi possível fazer a autenticação",
        });
        return;
      });
  };

  const handleSignUp = () => {
    navigation.navigate("signup");
  };
  return (
    <KeyboardAvoidingView
    w={"full"}
      h={"full"}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      bg={useColorModeValue(colors.light[50], colors.dark[100])}
       
    >
      <VStack
        flex={1}
        w={"full"}
        alignItems="center"
        bg={useColorModeValue(colors.light[50], colors.dark[100])}
        paddingX={8}
        paddingTop={24}
      >
          <Animated.View entering={FadeInDown.duration(500)}>
            <Logo width={120} />
          </Animated.View>

          <Heading
            color={useColorModeValue(colors.light[700], colors.light[200])}
            fontSize="xl"
            mt={20}
            mb={6}
          >
            Acesse sua conta
          </Heading>

          <FormControl isRequired isInvalid={"email" in errors} mb={4}>
            <Input
              type="text"
              placeholder="E-mail"
              InputLeftElement={
                <Icon as={<Envelope color={colors.light[600]} />} ml={4} />
              }
              onChangeText={(t) => {
                handleEmail(t.replace(/\s/g, ""));
              }}
              autoCapitalize="none"
            />
            <FormControl.HelperText
              _text={{
                fontSize: "xs",
              }}
            ></FormControl.HelperText>
            <FormControl.ErrorMessage
              _text={{
                fontSize: "xs",
              }}
            >
              {errors.email}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={"password" in errors} mb={8}>
            <Input
              placeholder="Senha"
              InputLeftElement={
                <Icon as={<Key color={colors.dark[300]} />} ml={4} />
              }
              secureTextEntry
              onChangeText={(p) => handlePassword(p)}
              autoCapitalize="none"
            />
            <FormControl.HelperText
              _text={{
                fontSize: "xs",
              }}
            ></FormControl.HelperText>
            <FormControl.ErrorMessage
              _text={{
                fontSize: "xs",
              }}
            >
              {errors.password}
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            title="Entrar"
            w={"full"}
            mb={4}
            onPress={handleSignIn}
            isLoading={isLoading}
          />

          <Button
            size={"sm"}
            title="Criar conta"
            color={colors.primary[500]}
            variant={"link"}
            w={"full"}
            h={8}
            mb={4}
            _pressed={{}}
            onPress={handleSignUp}
          />
      </VStack>
    </KeyboardAvoidingView>
  );
}
