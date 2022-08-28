import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";
//Firebase
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  addDoc,
  getDoc,
  doc,
} from "@firebase/firestore";

export const ModalComments = ({
  isVisible,
  setIsVisible,
  idUsuario, //Id del usuario que hizo la publicacion
  idPublicacion,
  actualUser, //Id del usuario actual
  comentarios,
}) => {
  const [infoActualUser, setInfoActualUser] = useState({});

  const [newComment, setNewComment] = useState("");
  /* console.log(idUsuario, idPublicacion); */ //Tengo el id de la publicaciones y el id del usuario que hio esta publicacion
  //Firebase
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  //   useEffect(() => {
  //     getComments();
  //   }, []);

  useEffect(() => {
    getActualUserInfo();
  }, []);

  const getActualUserInfo = async () => {
    const docuRef = doc(firestore, `usuarios/${actualUser}`);
    const docSnap = await getDoc(docuRef);
    setInfoActualUser(docSnap.data());
  };

  //   const getComments = async () => {
  //     //Esta funcion me va a traer los comentarios de esta publicacion
  //     const q = query(
  //       collection(firestore, "comentarios"),
  //       where("idPublicacion", "==", idPublicacion) //Con esta consulta estoy buscando en la coleccion comentarios los idPublicacion que coincidan con el id de esta publicacion
  //     );
  //     //Además esta misma consulta se esta haciendo para cada elemento del flatlist
  //     let data = [];
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       data.push({ idP: doc.id, ...doc.data() });
  //     });
  //     setComentarios(data);
  //   };

  const sendComment = async () => {
    if (newComment === "") {
      Alert.alert("Debe agregar una descripción");
      return;
    }

    await addDoc(collection(firestore, "comentarios"), {
      idPublicacion: idPublicacion,
      idUsuario: actualUser,
      text: newComment,
      nombre: infoActualUser.nombre,
      apellido: infoActualUser.apellido,
    });
  };

  return (
    <Modal animationType="fade" visible={isVisible} transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 350,
            height: 600,
            backgroundColor: "white",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            elevation: 10,
            borderRadius: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => setIsVisible(false)}
            activeOpacity={0.7}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
          >
            <Icon name="close-circle-outline" size={35} />
          </TouchableOpacity>
          {/* Titulo */}
          <View
            style={{
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 32, fontWeight: "bold" }}>
              Comentarios
            </Text>
          </View>
          {/* Cuerpo */}
          <View
            style={{
              height: 320,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
          >
            {/* Lista de comentarios */}
            <FlatList
              data={comentarios}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                  }}
                >
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {item.nombre} {item.apellido}
                    </Text>{" "}
                    {item.text}
                  </Text>
                </View>
              )}
            />
          </View>

          {/* Agregar un comentario */}
          <View
            style={{
              marginHorizontal: 15,
            }}
          >
            <TextInput
              onChangeText={(value) => setNewComment(value)}
              style={styles.textInputStyle}
              multiline
              numberOfLines={4}
              placeholder="Comentame..."
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TouchableOpacity
              onPress={sendComment}
              activeOpacity={0.8}
              style={{
                height: 50,
                borderRadius: 20,
                backgroundColor: "#38b000",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 22,
                }}
              >
                Agregar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
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
