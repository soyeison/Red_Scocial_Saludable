import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
//Firebase
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import { getFirestore, doc, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

export const AddInfoUserScreen = ({ route }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const navigation = useNavigation();

  //Firebase config
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const onSubmit = () => {
    if (nombre.length < 3 || apellido.length < 3) {
      Alert.alert(
        "Ups...",
        "Debe ingresar un nombre y apellido válidos.",
        [{ text: "Ok" }],
        {
          cancelable: true,
        }
      );
      return;
    } else {
      const docuRef = doc(firestore, `usuarios/${route.params.uid}`);
      setDoc(docuRef, { nombre, apellido }, { merge: true });
      navigation.navigate("Tabs", { uid: route.params.uid });
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{ ...styles.header, alignSelf: "center", textAlign: "center" }}
        >
          Por favor complete los siguientes apartados
        </Text>
        {/* Separador */}
        <View style={{ height: 50 }} />

        {/* Inputs */}
        <Text style={styles.subTitle}>Nombre</Text>
        <TextInput
          onChangeText={(value) => setNombre(value)}
          style={styles.textInputStyle}
          placeholder="Nombre"
          autoCapitalize="words"
          keyboardType="default"
        />

        <Text style={styles.subTitle}>Apellido</Text>
        <TextInput
          onChangeText={(value) => setApellido(value)}
          style={styles.textInputStyle}
          placeholder="Apellido"
          autoCapitalize="words"
          keyboardType="default"
        />
        <View style={{ height: 30 }} />
        {/* Botones */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttons}
          onPress={onSubmit}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Continuar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 60,
    height: height - 110,
    alignSelf: "center",
    marginTop: 110,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 40,
  },
  subTitle: {
    fontSize: 18,
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttons: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#38b000",
    justifyContent: "center",
    marginVertical: 10,
  },
});
