import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface OtpInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  length: number;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length,
}) => {
  const inputs = Array.from({ length }, (_, index) => index);

  const handleChangeText = (text: string, index: number) => {
    const newValue = [...value];
    newValue[index] = text;
    onChange(newValue);
  };

  return (
    <View style={styles.container}>
      {inputs.map((_, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={value[index] || ""}
          onChangeText={(text) => handleChangeText(text, index)}
          maxLength={1}
          keyboardType="numeric"
          textAlign="center"
          mode="outlined"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  input: {
    width: 50,
    height: 50,
    fontSize: 24,
    textAlign: "center",
  },
});
