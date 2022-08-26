import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import { getFirestore, doc, getDoc } from "@firebase/firestore";
import { CardHome } from "../components/CardHome";

export const HomeScreen = ({ route }) => {
  /* console.log(route.params.uid); */ //Este es el id del usuario que se logeo
  const [state, setState] = useState({});
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const getInfo = async () => {
    //Esta funcion va a ser la que me va a leer la informacion de una referencia de la DB de firebase
    const docuRef = doc(firestore, `usuarios/${route.params.uid}`);
    const encripted = await getDoc(docuRef);
    const infoFinal = encripted.data();
    setState({
      nombre: infoFinal.nombre,
      apellido: infoFinal.apellido,
      publicaciones: infoFinal.publicaciones,
    });
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
      <FlatList
        data={state.publicaciones}
        renderItem={({ item }) => (
          <CardHome
            nombre={state.nombre}
            apellido={state.apellido}
            descripcion={item}
          />
        )}
        keyExtractor={(index) => route.params.uid + index}
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
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    fontSize: 35,
    fontWeight: "bold",
  },
});
