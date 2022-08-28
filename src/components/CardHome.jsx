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
import React, { useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;

export const CardHome = ({ nombre, apellido, descripcion, uri }) => {
  const [isVisible, setIsVisible] = useState(false);
  const getComments = () => {
    //Esta función me va a traer los comentarios de cada publicación
  };
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
          <Text style={{ paddingLeft: 5 }}>Comentarios</Text>
        </TouchableOpacity>

        {/* Aqui esta el modal con los comentarios */}
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
                  /* backgroundColor: "red", */
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "300" }}>
                  Aqui van a ir los comentarios
                </Text>
              </View>

              {/* Agregar un comentario */}
              <View
                style={{
                  marginHorizontal: 15,
                }}
              >
                <TextInput
                  onChangeText={(value) => setDescripcion(value)}
                  style={styles.textInputStyle}
                  multiline
                  numberOfLines={4}
                  placeholder="Comentame..."
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <TouchableOpacity
                  onPress={() => setIsVisible(false)}
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
                    Cerrar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  textInputStyle: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});
