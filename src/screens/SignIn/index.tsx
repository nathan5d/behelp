import React from "react";
import { useState } from "react";
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
} from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import Logo from "../../assets/logo_primary.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Alert } from "react-native";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("Nathan");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();
  const [errors, setErrors] = React.useState({});

  const validateEmail = () => {
    if (email === undefined) {
      setErrors({ ...errors, name: "Name is required" });
      return false;
    } else if (email.length < 3) {
      setErrors({ ...errors, name: "Name is too short" });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    validateEmail()
      ? console.log("Submitted")
      : console.log("Validation Failed");
  };

  const handleGoToRegister = () => {
    //navigation.navigate("login");
  }
  const handleSignIn = () => {
    if (!email || !password) {
      return Alert.alert(
        "Entrar",
        "Please enter your email address and password."
      );
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
          return Alert.alert("Entrar", "Email inválido");
        }
        if (error.code === "auth/wrong-password") {
          return Alert.alert("Entrar", "Email ou senha inválido");
        }
        if (error.code === "auth/user-not-found") {
          return Alert.alert("Entrar", "Email ou senha inválido");
        }
        return Alert.alert("Entrar", "Não foi possível fazer a autenticação");
      });
  };

  return (
    <VStack
      flex={1}
      alignItems="center"
      bgColor={"dark.600"}
      paddingX={8}
      paddingTop={24}
    >
      <PresenceTransition
        visible={true}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 250,
          },
        }}
      >
        <Logo />
      </PresenceTransition>

      <Heading color={"light.100"} fontSize="xl" mt={20} mb={6}>
        Acesse Sua Conta
      </Heading>
      <FormControl isRequired mb={4}>
        <Input
          type="text"
          placeholder="E-mail"
          InputLeftElement={
            <Icon as={<Envelope color={colors.dark[300]} />} ml={4} />
          }
          onChangeText={(t) => {
            setEmail(t);
            onSubmit;
          }}
          autoCapitalize="none"
        />
      </FormControl>
      <FormControl isRequired mb={8}>
        <Input
          placeholder="Senhas"
          InputLeftElement={
            <Icon as={<Key color={colors.dark[300]} />} ml={4} />
          }
          secureTextEntry
          onChangeText={(p) => setPassword(p)}
          autoCapitalize="none"
        />
      </FormControl>

      <Button
        title="Logar"
        w={"full"}
        mb={4}
        onPress={handleSignIn}
        isLoading={isLoading}
      />

      
    </VStack>
  );
}
