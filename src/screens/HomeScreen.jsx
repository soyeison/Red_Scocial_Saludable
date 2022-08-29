import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
//Firebase
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import { getFirestore, getDocs, collection } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { CardHome } from "../components/CardHome";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = ({ route }) => {
  /* console.log(route.params.uid); */ //Este es el id del usuario que se logeo
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const navigation = useNavigation();

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    const backAction = () => {
      //Lo que quiero que haga la funcion es que cierre la sesión
      Alert.alert("Eyy", "Esta seguro que desea cerrar sesión?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: async () => {
            await auth.signOut();
            navigation.navigate("LoginScreen");
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      //Esta funcion va a manejar el evento del boton de atras en android
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

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

  const { top } = useSafeAreaInsets(); //Hook que me guarda la distancia segura del top para no chocar con nada arriba
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Agregar modal para oder ingresar una nueva publicacion */}

      {/* Faltlist de los posts */}
      {isLoading ? (
        <View>
          <ActivityIndicator size={60} color="#38b000" />
          <Text style={{ fontWeight: "bold" }}>Cargando...</Text>
        </View>
      ) : (
        //Apenas se cargue la info entonces muestrala
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <View>
              <ActivityIndicator size={60} color="#38b000" />
              <Text style={{ fontWeight: "bold" }}>Cargando...</Text>
            </View>
          ) : (
            <FlatList
              data={state}
              renderItem={({ item }) => (
                <CardHome
                  nombre={item.nombre}
                  apellido={item.apellido}
                  descripcion={item.text}
                  uri={item.uri}
                  idUsuario={item.usuario}
                  idPublicacion={item.idP}
                  actualUser={route.params.uid}
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
