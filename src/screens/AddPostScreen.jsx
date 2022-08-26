import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";

const { height, width } = Dimensions.get("window");

export const AddPostScreen = () => {
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
          style={styles.textInputStyle}
          multiline
          numberOfLines={12}
          placeholder="Cuentame..."
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <View style={{ height: 30 }} />
        {/* Botones */}
        <TouchableOpacity activeOpacity={0.8} style={styles.buttons}>
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
    marginTop: 110,
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
