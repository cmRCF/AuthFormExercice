import React from "react";

import {
    TextInput as RNTextInput, StyleSheet, TextInputProps
} from "react-native";

interface RCFTextInputProps extends TextInputProps {
    isError?: boolean
}

const TextInput = (props: RCFTextInputProps) => {
    const { isError = false } = props;
    return <RNTextInput
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor="#a0a2a5"
        style={[styles.input, {borderColor: isError ? "#F00" : "#404040", borderWidth:1}]}
        {...props} />
}

export default TextInput;

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        width: 250,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        padding: 5,
        color: "#404040",
        height: 40
    }
})