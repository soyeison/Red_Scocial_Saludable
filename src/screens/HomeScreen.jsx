import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
} from "@firebase/firestore";
import { CardHome } from "../components/CardHome";
import Icon from "@expo/vector-icons/Ionicons";

export const HomeScreen = ({ route }) => {
  /* console.log(route.params.uid); */ //Este es el id del usuario que se logeo
  const [state, setState] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const getInfo = async () => {
    //Esta funcion va a ser la que me va a leer la informacion de las publicaciones de la DB
    let data = [];
    const querySnapshot = await getDocs(collection(firestore, "publicaciones"));
    querySnapshot.forEach((doc) => {
      data.push({ idP: doc.id, ...doc.data() });
    });
    setState(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getInfo();
  }, []);

  const { top } = useSafeAreaInsets(); //Hook que me guarda la distancia segura del top para no chocar con nada arriba
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
      }}
    >
      {/* Agregar modal para oder ingresar una nueva publicacion */}

      {/* Faltlist de los posts */}
      {state.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                No hay publicaciones para mostrar
              </Text>
              <Icon
                style={{ textAlign: "center" }}
                name="barbell-outline"
                size={45}
                color={"#38b000"}
              />
            </View>
          )}
        </View>
      ) : (
        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={state.reverse()}
              renderItem={({ item }) => (
                <CardHome
                  nombre={item.nombre}
                  apellido={item.apellido}
                  descripcion={item.text}
                  uri={item.uri}
                />
              )}
              keyExtractor={(item, index) =>
                route.params.uid + index.toString()
              }
              ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <Text
                  style={{
                    ...styles.listHeader,
                    marginHorizontal: 20,
                    top: top + 20,
                    marginBottom: top + 20,
                    paddingBottom: 10,
                  }}
                >
                  Inicio
                </Text>
              }
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    fontSize: 35,
    fontWeight: "bold",
  },
});

{
  /*  */
}
