import { useCollisionStore } from "@/store/collisionStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-get-random-values";
import { Button, Text, TextInput } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import z from "zod";

const collisionSchema = z.object({
  location: z.string().min(1, { error: "Location must not be empty" }),
  description: z.string().min(1, { error: "Description must not be empty" }),
});

type FormErrors = {
  location?: String[];
  description?: String[];
};

type CollisionForm = {
  location: string;
  description: string;
};

const Index = () => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [formData, setFormData] = useState<CollisionForm>({
    location: "",
    description: "",
  });

  const { addCollision } = useCollisionStore();
  const router = useRouter();

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handlePress = () => {
    const parse = collisionSchema.safeParse({ location, description });
    if (!parse.success) {
      const errors = z.flattenError(parse.error);
      setFormErrors(errors.fieldErrors);
    } else {
      addCollision({
        id: uuidv4(),
        date: new Date(),
        location,
        description,
        vehicles: [],
        media: [],
        witnesses: [],
        officer: null,
      });
      router.back();
    }
  };

  return (
    <View>
      <TextInput
        error={!!formErrors.location}
        label={"Location"}
        value={location}
        onChangeText={(text) => {
          setLocation(text);
          setFormErrors({
            ...formErrors,
            location: undefined,
          });
        }}
        style={styles.input}
        mode="outlined"
      />
      <Text style={styles.errorbox}>{formErrors.location?.at(0)}</Text>
      <TextInput
        error={!!formErrors.description}
        label={"Description"}
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          setFormErrors({
            ...formErrors,
            description: undefined,
          });
        }}
        style={styles.input}
        mode="outlined"
      />
      <Text style={styles.errorbox}>{formErrors.description?.at(0)}</Text>
      <Button mode="contained" style={styles.button} onPress={handlePress}>
        Add Collision
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    margin: 10,
    borderRadius: 5,
  },
  errorbox: {
    color: "red",
    marginHorizontal: 10,
  },
});

export default Index;
