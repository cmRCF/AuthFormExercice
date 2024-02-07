import React, { useRef, useEffect, useState } from "react";
import { AgeCounter } from "../AgeCounter/AgeCounter";

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

export default function StatesTraining() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AgeCounter/>
    </SafeAreaView>
  )
}