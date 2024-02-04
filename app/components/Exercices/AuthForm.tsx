import React, { useRef, useEffect, useState } from "react";

import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScaledSize,
  Alert,
  Animated,
} from "react-native";
import RCFTextInput from "../../views/Inputs/RCFTextInput";


const AuthForm = () => {

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [count, setCount] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [windowDimensions, setWindowDimensions] = useState<{width: number,height: number}>({width:Dimensions.get("window").width, height:Dimensions.get("screen").height})
  const logoAnim = useRef(new Animated.ValueXY({ x: -windowDimensions.width, y: 0 })).current;
  // ComponentDidMount
  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: { x: 0, y: 0 },
        duration: 5000,
        useNativeDriver: true,
      }),
      Animated.timing(logoAnim, {
        toValue: { x: windowDimensions.width, y: 0 },
        duration: 5000,
        useNativeDriver: true,
      }),
    ]).start(() => setIsLoading(false));
    addEmail("Chargement...");
    Dimensions.addEventListener("change", handleDimensionsChange)
    // ComponentWillUnmount
    return (() => {

    });
  }, []);

  const handleDimensionsChange = ({window, screen}: {
      window: ScaledSize;
      screen: ScaledSize;
    }) => {
      console.log({window, screen});

  }

  const onViewDidAppear = () => {
    setIsLoading(false);;
  }

  const addEmail = (text: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (emailRegex.test(text)) {
      setEmail(text);
      setEmailError(null);
    } else {
      setEmailError("Veuillez entrer un email valide");
    }
  }

  const addPassword = (text: string) => {
    setPassword(text);
  }

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez renseigner un email et un mot de passe pour vous connecter");
      return;
    }
    Alert.alert("Succès", "Bienvenue sur RCF !");
  }

  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez renseigner un email et un mot de passe pour vous inscrire");
      return;
    }
    Alert.alert("Succès", "Inscription réussie !");
  }

  const getContent = () => {
    if (isLoading === true) {
      return <View onLayout={onViewDidAppear} style={styles.main}>
          <ActivityIndicator color={"#FFFFFF"} animating={true} />
      </View>
    }
    return <View style={styles.main}>
      <Image 
        source={require("../../assets/img/radio_rcf_cover.jpeg")} 
        style={[StyleSheet.absoluteFill, styles.backgroundImage]}
        resizeMode="cover"/>
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>Connectez-vous !</Text>
      <RCFTextInput 
        isError={!!emailError}
        placeholder="Votre email"
        clearButtonMode="while-editing"
        onChangeText={addEmail}
        keyboardType="email-address"/>
      {emailError && <Text style={{ color: 'red' }}>{emailError}</Text>}
      <RCFTextInput
        placeholder="Votre mot de passe"
        onChangeText={addPassword}
        secureTextEntry={true}/>
      <TouchableOpacity style={styles.connectionButton} onPress={handleSignIn}>
        <Text style={styles.connectionButtonText}>Connexion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Inscription</Text>
      </TouchableOpacity>
    </View>
  }

  return (
    <SafeAreaView style={styles.main}>
      {isLoading ? (
        <Animated.Image
          source={require('../../assets/img/logo_rcf.jpg')}
          style={[
            styles.logo,
            {
              transform: [
                { translateX: logoAnim.x },
                { scale: logoAnim.x.interpolate({
                    inputRange: [-windowDimensions.width, 0, windowDimensions.width],
                    outputRange: [1, 1.5, 1],
                  }) 
                },
              ],
            },
          ]}
          resizeMode="contain"
        />
      ) : (
        getContent()
      )}
    </SafeAreaView>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get("screen").width
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 30
  },
  subtitle: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 24
  },
  image: {
    height: 200
  },
  backgroundImage: {
    position: "absolute",
    width: '100%',
    height: '100%',
  },
  connectionButton: {
    backgroundColor: "#FFFFFF",
    color: "#FFFFFF",
    marginTop: 10,
    height: 40,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    width: 250,
  },
  connectionButtonText: {
    color: "#a8000a",
    fontWeight: "bold",
    fontSize: 18,
  },
  signUpButton: {
    backgroundColor: "#a8000a",
    color: "#FFFFFF",
    marginTop: 10,
    height: 40,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    width: 250,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  logo: {
    width: 100,
    height: 100,
  },
})