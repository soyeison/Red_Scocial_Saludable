import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import { getFirestore, doc, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
/* import Icon from "@expo/vector-icons/Ionicons";  */ //Estos son los iconos que vienen con expo

const { height, width } = Dimensions.get("window");

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  /* Configuracion para firebase */
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const handleCreateAccount = async () => {
    //Se puede convertir en hook
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Account created");
        const docuRef = doc(firestore, `usuarios/${userCredential.user.uid}`);
        setDoc(docuRef, { correo: email, contraseña: password }); //Con esto lo que estoy haciendo es crear un registro en la referencia que seleccione anteriormente
        console.log(userCredential.user.uid);
        navigation.navigate("AddInfoUserScreen", {
          uid: userCredential.user.uid,
        }); //Una vez creado el registro quiero que navega a esta pantalla
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Ups...", error.message, [{ text: "Ok" }], {
          cancelable: true,
        });
      });
  };

  const handleSignIn = () => {
    //Se puede convertir en hook
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed In");
        navigation.navigate("Tabs", { uid: userCredential.user.uid }); //En caso de que lo que quiera es logearme, entonces me lleva a esta otra pantalla
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Ups...", error.message, [{ text: "Ok" }], {
          cancelable: true,
        });
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <Text
          style={{ ...styles.header, textAlign: "center", alignSelf: "center" }}
        >
          Bienvenido de vuelta
        </Text>
        <Text style={{ marginTop: 10 }}>
          Bienvenido! Por favor ingrese sus credenciales.
        </Text>

        {/* Separador */}
        <View style={{ height: 50 }} />

        {/* Inputs */}
        <Text style={styles.subTitle}>Email</Text>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          style={styles.textInputStyle}
          placeholder="Ingrese un email"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.subTitle}>Contraseña</Text>
        <TextInput
          onChangeText={(value) => setPassword(value)}
          style={styles.textInputStyle}
          placeholder="Ingrese un email"
          autoCapitalize="none"
          keyboardType="default"
          secureTextEntry={true}
        />

        <View style={{ height: 30 }} />
        {/* Botones */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttons}
          onPress={handleSignIn}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Ingresar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttons}
          onPress={handleCreateAccount}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Registrarse
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
    marginVertical: 8,
  },
});
