import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface PinInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  secureTextEntry?: boolean;
}

export const PinInput: React.FC<PinInputProps> = ({
  value,
  onChange,
  secureTextEntry = true,
}) => {
  const inputs = Array.from({ length: 4 }, (_, index) => index);

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
          secureTextEntry={secureTextEntry}
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
    width: 60,
    height: 60,
    fontSize: 24,
    textAlign: "center",
  },
});
