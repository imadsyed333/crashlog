import ErrorBox from "@/components/misc/ErrorBox";
import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import z from "zod";

const collisionDetailsSchema = z.object({
  location: z.string().min(1, { error: "Location must not be empty" }),
  description: z.string().min(1, { error: "Description must not be empty" }),
});

type FormErrors = {
  location?: String[];
  description?: String[];
};

const collisionDetailsFormScreen = () => {
  const insets = useSafeAreaInsets();

  const { collision, updateCollisionField } = useCollisionFormStore();

  const { location, description, date } = collision;
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const router = useRouter();

  const handlePress = () => {
    const parse = collisionDetailsSchema.safeParse({ location, description });
    if (!parse.success) {
      const errors = z.flattenError(parse.error);
      setFormErrors(errors.fieldErrors);
    } else {
      router.navigate("/collisions/form/vehicleListScreen");
    }
  };

  const setDate = (event: DateTimePickerEvent, date: Date) => {
    updateCollisionField("date", date);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          error={!!formErrors.location}
          label={"Location"}
          value={location}
          onChangeText={(text) => {
            updateCollisionField("location", text);
            setFormErrors({
              ...formErrors,
              location: undefined,
            });
          }}
          style={styles.input}
          mode="outlined"
        />
        <ErrorBox errors={formErrors.location} />
        <TextInput
          error={!!formErrors.description}
          label={"Description"}
          multiline={true}
          value={description}
          onChangeText={(text) => {
            updateCollisionField("description", text);
            setFormErrors({
              ...formErrors,
              description: undefined,
            });
          }}
          style={{ ...styles.input, minHeight: 100 }}
          mode="outlined"
        />
        <ErrorBox errors={formErrors.description} />
        <RNDateTimePicker
          value={new Date(date)}
          onChange={(e, date) => setDate(e, date!)}
          mode="datetime"
          textColor="black"
          style={styles.datetimepicker}
        />
      </View>
      <Button mode="contained" style={styles.button} onPress={handlePress}>
        Next
      </Button>
    </View>
  );
};

export default collisionDetailsFormScreen;
