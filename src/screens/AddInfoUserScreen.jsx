import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Icon from "@expo/vector-icons/Ionicons";
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
  const [image, setImage] = useState(
    "https://p16-va-default.akamaized.net/img/musically-maliva-obj/1665282759496710~c5_720x720.jpeg"
  );

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
      setDoc(docuRef, { nombre, apellido, uriProfile: image }, { merge: true });
      navigation.navigate("Tabs", { uid: route.params.uid });
    }
  };

  const pickImage = async () => {
    //Esta función me permite seleccionar una foto desde mi galeria
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync(); //Esto pide los permisos al usuarios para acceder a la galeria
    if (permissionResult.granted === false) {
      Alert.alert("No me dejaste acceder a las fotos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    /* console.log(result); */

    if (!result.cancelled) {
      setImage(result.uri); //Aqui esta la uri de la foto
      /* console.log(result.uri); */
    }
  };

  //Funciones para usar la camara
  const openCamera = async () => {
    const permisisonResult = await ImagePicker.requestCameraPermissionsAsync(); //Esto pide permisos al usuario para acceder a la camara

    if (permisisonResult.granted === false) {
      Alert.alert("No tengo permisos para acceder a la cámara");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setImage(result.uri);
      /* console.log(result.uri); */
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

        {/* Zona para agregar */}
        <View style={{ alignItems: "center" }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
          )}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={pickImage}>
              <Icon name="image-outline" size={35} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera}>
              <Icon name="camera-outline" size={35} color="grey" />
            </TouchableOpacity>
          </View>
        </View>

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
    height: height - 80,
    alignSelf: "center",
    marginTop: 50,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
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
