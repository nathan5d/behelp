import { NativeBaseProvider, extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    primary: {
      500:"#996dff",
      700: "#996DFF",
    },
    secondary: {
      500:"#04D361",
      700: "#FBA94C",
    },
    light:{

    },
    dark: {
      50: "#111",
      100: "#222",
    },

    white: "#FFFFFF",
    green: {
      700: "#00875F",
      500: "#00B37E",
      300: "#04D361",
    },
  },
  components:{
    Filter:{
      
    }
  },
  fonts: {
    heading: "Roboto_700Bold",
    body: "Roboto_400Regular",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56,
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "light",
  },
});
