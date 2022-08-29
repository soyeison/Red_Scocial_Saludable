import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { ModalComments } from "./ModalComments";
//Firebase
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  getDoc,
  doc,
} from "@firebase/firestore";

const windowWidth = Dimensions.get("window").width;

export const CardHome = ({
  nombre,
  apellido,
  descripcion,
  uri,
  idUsuario,
  idPublicacion,
  actualUser,
}) => {
  const [infoUser, setInfoUser] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  //Firebase
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  useEffect(() => {
    getActualUserInfo();
  }, []);

  useEffect(() => {
    getComments();
  }, [isVisible]);

  const getActualUserInfo = async () => {
    const docuRef = doc(firestore, `usuarios/${idUsuario}`);
    const docSnap = await getDoc(docuRef);
    setInfoUser(docSnap.data());
  };

  const getComments = async () => {
    //Esta funcion me va a traer los comentarios de esta publicacion
    const q = query(
      collection(firestore, "comentarios"),
      where("idPublicacion", "==", idPublicacion) //Con esta consulta estoy buscando en la coleccion comentarios los idPublicacion que coincidan con el id de esta publicacion
    );
    //Además esta misma consulta se esta haciendo para cada elemento del flatlist
    let data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({ idP: doc.id, ...doc.data() });
    });
    setComentarios(data);
  };

  return (
    <View
      style={{
        ...styles.cardContainer,
        width: windowWidth * 0.85,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        <Image
          source={{
            uri: infoUser.uriProfile,
          }}
          style={{ height: 50, width: 50, borderRadius: 20 }}
        />
        <Text style={{ paddingHorizontal: 20, fontWeight: "bold" }}>
          {nombre} {apellido}
        </Text>
      </View>

      {/* Zona de descripcion */}
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <Text style={{ margin: 10 }}>{descripcion}</Text>
      </View>
      <View
        style={{
          height: 250,
          marginBottom: 10,
        }}
      >
        <Image
          source={{
            uri: uri,
          }}
          style={{ flex: 1, marginHorizontal: 10 }}
        />
      </View>

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
          activeOpacity={0.7}
          style={{
            ...styles.buttons,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Icon name="chatbox-outline" size={25} />
          <View style={{ width: 5, backgroundColor: "red" }} />
          <Text>{comentarios.length}</Text>
          <View style={{ width: 10, backgroundColor: "red" }} />
          <Text style={{ paddingLeft: 5 }}>Comentarios</Text>
        </TouchableOpacity>

        {/* Aqui esta el modal con los comentarios */}
        <ModalComments
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          idUsuario={idUsuario}
          idPublicacion={idPublicacion}
          actualUser={actualUser}
          comentarios={comentarios}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  buttons: {
    width: 120,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});
