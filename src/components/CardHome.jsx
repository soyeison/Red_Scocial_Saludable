import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;

export const CardHome = ({ nombre, apellido, descripcion, uri }) => {
  return (
    <View
      style={{
        ...styles.cardContainer,
        borderWidth: 1,
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
            uri: "https://socialtools.me/wp-content/uploads/2016/04/foto-de-perfil.jpg",
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
          activeOpacity={0.7}
          style={{
            ...styles.buttons,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Icon name="chatbox-outline" size={25} />
          <Text style={{ paddingLeft: 5 }}>Comentarios</Text>
        </TouchableOpacity>
      </View>
    </View>
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
});
