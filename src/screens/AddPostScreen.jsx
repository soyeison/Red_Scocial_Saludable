import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
} from "@firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import Icon from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

export const AddPostScreen = ({ route }) => {
  /* console.log(route.params.uid); */ //Tengo el id del usuario que va a hacer la publicación
  const [infoUserState, setInfoUserState] = useState({}); //Aqui esta guardado el nombre y apellido de usuario
  const navigation = useNavigation();
  const [image, setImage] = useState(""); //Aquí se va a guardar la imagen que se cargue
  const [descripcion, setDescripcion] = useState("");
  //Firebase config
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  useEffect(() => {
    infoUser();
  }, []);

  const infoUser = async () => {
    const docRef = doc(firestore, "usuarios", `${route.params.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      /* console.log("Documento data:", docSnap.data()); */
      setInfoUserState(docSnap.data());
    } else {
      console.log("No such document");
    }
  };

  const sendPost = async () => {
    //Función que me permite agregar una publicación
    if (descripcion === "") {
      Alert.alert("Debe agregar una descripción");
      return;
    }

    const docRef = await addDoc(collection(firestore, "publicaciones"), {
      apellido: infoUserState.apellido,
      nombre: infoUserState.nombre,
      text: descripcion,
      uri: image,
      usuario: route.params.uid,
    });
    // console.log(docRef.id) Este es el id de la publicacion que acabo de hacer
    navigation.navigate("HomeScreen");
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
        {/* Header */}
        <Text
          style={{ ...styles.header, textAlign: "center", alignSelf: "center" }}
        >
          En que piensas...?
        </Text>

        {/* Separador */}
        <View style={{ height: 30 }} />

        {/* Input */}
        <Text style={styles.subTitle}>Descripción</Text>
        <TextInput
          onChangeText={(value) => setDescripcion(value)}
          style={styles.textInputStyle}
          multiline
          numberOfLines={8}
          placeholder="Cuentame..."
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Zona para agregar */}
        <View style={{ alignItems: "center" }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
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
          onPress={sendPost}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Agregar publicación
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
    marginTop: 50,
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
  input: {
    margin: 12,
    borderWidth: 1,
  },
});
