import React, { useEffect, useState } from "react";

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
    ScaledSize
} from "react-native";
import TextInput from "../../views/Inputs/RCFTextInput";

const HelloWorld = () => {

    const [name, setName] = useState<string | undefined>(undefined);
    const [count, setCount] = useState<number>(-1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [windowDimensions, setWindowDimensions] = useState<{width: number,height: number}>({width:Dimensions.get("window").width, height:Dimensions.get("screen").height})

    // ComponentDidMount
    useEffect(() => {
        setName("Chargement...");
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

    useEffect(() => {
        if (name !== undefined) {
            setCount(name.length);
        }
    }, [name]);

    const addName = (text: string) => {
        setName(text);
    }

    const increaseCounter = () => {
        setCount(count => count + 1);
        setCount(prev => prev + 1);
    }

    const getContent = () => {
        if (isLoading === true) {
            return <View onLayout={onViewDidAppear} style={styles.main}>
                <ActivityIndicator color={"#FFFFFF"} animating={true} />
            </View>
        }
        return <View style={styles.main}>
            <Image source={{ uri: "https://9to5mac.com/wp-content/uploads/sites/6/2022/06/7411.WWDC_2022_Light-1024w-1366h@2xipad.jpeg" }} style={[StyleSheet.absoluteFill, styles.backgroundImage]} />
            <Text style={styles.title}>Bienvenue</Text>
            <Text style={styles.subtitle}>Connectez-vous !</Text>
            <TextInput
                placeholder="Votre email"
                clearButtonMode="while-editing"
                onChangeText={addName} />
            <TextInput
                isError={true}
                placeholder="Votre mot de passe"
                onChangeText={addName} />
            <TouchableOpacity onPress={increaseCounter}>
                <Text style={{ color: "#FFFFFF" }}>
                    Connexion
                </Text>
            </TouchableOpacity>
        </View>
    }

    return <SafeAreaView style={styles.main}>
        {getContent()}
    </SafeAreaView>
}

export default HelloWorld;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DD0000",
        width: Dimensions.get("screen").width
    },
    title: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 24
    },
    subtitle: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 18
    },
    image: {
        height: 200
    },
    imageContainer: {
        flexDirection: "row"
    },
    backgroundImage: {
        position: "absolute"
    },
    counter: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 32
    },
    button: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#0000DD",
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 32
    }
})