import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Platform } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation, validatePathConfig } from "@react-navigation/native";
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
  KeyboardAvoidingView,
  ScrollView,
} from "native-base";
import { Envelope, Key, User } from "phosphor-react-native";
import Logo from "../../assets/be_logo_primary.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Controller, useForm } from "react-hook-form";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

type ErrorProps = {
  email: string;
  password: string;
  confirmPassword: string;
};
export default function SignUp() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const validateConfirmPassword = () => {
    if (confirmPassword === "") {
      setErrors({
        ...errors,
        confirmPassword: "Você precisa definir uma senha.",
      });
      return false;
    } else if (confirmPassword.length < 3) {
      setErrors({ ...errors, confirmPassword: "A senha é muito curta." });
      return false;
    } else if (confirmPassword != password) {
      setErrors({ ...errors, confirmPassword: "A senha não confere." });
      return false;
    } else {
      setErrors({ ...errors, confirmPassword: "" });
      return true;
    }

    return true;
  };

  const clearErrors = () => {
    setErrors({
      ...errors,
      email: "",
      password: "",
      confirmPassword: "",
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
  const handleConfirmPassword = (_cpassword) => {
    clearErrors();
    setConfirmPassword(_cpassword);
    validateConfirmPassword();
  };

  useEffect(() => {
    handleEmail(email);
  }, [email]);

  useEffect(() => {
    handlePassword(password);
  }, [password]);

  /*const onSubmit = () => {
    validateEmail();
    validatePassword();
  };*/

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleSignIn = () => {
    if(!email || !password || !confirmPassword){
      setErrors({ ...errors, confirmPassword: "Preencha todos os campos." });
      return false;
    }
    //onSubmit();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (validateEmail() && validatePassword()  && validateConfirmPassword() === false) {
   
      return false;
    }
   

    setIsLoading(true);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential.user;
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.code === "auth/email-already-in-use") {
          setErrors({
            ...errors,
            email: "Utilize um email válido",
          });
          return;
        }
        setErrors({
          ...errors,
          confirmPassword: error.message,
        });
       
        return;
      });
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
          Crie sua conta
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
        <FormControl isRequired isInvalid={"password" in errors} mb={4}>
          <Input
            placeholder="Senha"
            InputLeftElement={
              <Icon as={<Key color={colors.dark[300]} />} ml={4} />
            }
            secureTextEntry
            onChangeText={(p) => setPassword(p)}
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
        <FormControl isRequired isInvalid={"confirmPassword" in errors} mb={8}>
          <Input
            placeholder="Confirme sua senha"
            InputLeftElement={
              <Icon as={<Key color={colors.dark[300]} />} ml={4} />
            }
            secureTextEntry
            onChangeText={(p) => setConfirmPassword(p)}
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
            {errors.confirmPassword}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          title="Cadastrar"
          w={"full"}
          mb={4}
          onPress={handleSignIn}
          isLoading={isLoading}
        />
        <Button
          size={"sm"}
          title="Já tenho uma conta"
          color={colors.primary[500]}
          variant={"link"}
          w={"full"}
          h={8}
          mb={4}
          _pressed={{}}
          onPress={handleGoBack}
        />
      </VStack>
    </KeyboardAvoidingView>
  );
}
