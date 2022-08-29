import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ProfileScreen = ({ route }) => {
  const [infoUser, setInfoUser] = useState({});
  const [publicacionesUser, setPublicacionesUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { top } = useSafeAreaInsets();

  //Firebase
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  useEffect(() => {
    getActualUserInfo();
  }, []);

  useEffect(() => {
    getComments();
  }, []);

  const getActualUserInfo = async () => {
    const docuRef = doc(firestore, `usuarios/${route.params.uid}`);
    const docSnap = await getDoc(docuRef);
    setInfoUser(docSnap.data());
  };

  const getComments = async () => {
    //Esta funcion me va a traer los comentarios de esta publicacion
    const q = query(
      collection(firestore, "publicaciones"),
      where("usuario", "==", route.params.uid) //Con esta consulta estoy buscando en la coleccion comentarios los idPublicacion que coincidan con el id de esta publicacion
    );
    //Además esta misma consulta se esta haciendo para cada elemento del flatlist
    let data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({ idP: doc.id, ...doc.data() });
    });
    setPublicacionesUser(data);
    setIsLoading(false);
  };
  return (
    <FlatList
      data={publicacionesUser}
      renderItem={({ item }) => (
        <View>
          {isLoading ? (
            <View>
              <ActivityIndicator size={35} color="red" />
            </View>
          ) : (
            <View
              style={{
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  height: 300,
                  width: 300,
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    height: 300,
                    width: 300,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
          )}
        </View>
      )}
      ListHeaderComponent={
        <View
          style={{
            flex: 1,
            paddingTop: top + 60,
            height: 310,
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              height: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: infoUser.uriProfile,
              }}
              style={{ height: 150, width: 150, borderRadius: 80 }}
            />
            <View style={{ height: 10 }} />
            <Text>
              {infoUser.nombre} {infoUser.apellido}
            </Text>
            <Text>{infoUser.correo}</Text>
            <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 10 }}>
              Publicaciones
            </Text>
          </View>
        </View>
      }
    />
  );
};
