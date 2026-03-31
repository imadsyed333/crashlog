import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import RNDateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Platform, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

const CustomDTPicker = () => {
  const { collision, updateCollisionField } = useCollisionFormStore();
  const { date } = collision;

  const paperTheme = useTheme();

  const newDate = new Date(date);

  const setDate = (event: DateTimePickerEvent, date: Date | undefined) => {
    updateCollisionField("date", date || new Date());
  };

  const showPicker = (mode: "date" | "time") => {
    DateTimePickerAndroid.open({
      value: new Date(date),
      mode,
      onChange: setDate,
      is24Hour: false,
    });
  };

  const showDatePicker = () => {
    showPicker("date");
  };

  const showTimePicker = () => {
    showPicker("time");
  };

  return Platform.OS === "ios" ? (
    <Card mode="contained">
      <Card.Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Text variant="bodySmall">When did the collision happen?</Text>
        </View>
        <RNDateTimePicker
          value={new Date(date)}
          onChange={(e, date) => setDate(e, date!)}
          mode="datetime"
          style={styles.datetimepicker}
          themeVariant={paperTheme.dark ? "dark" : "light"}
        />
      </Card.Content>
    </Card>
  ) : (
    <Card mode="contained">
      <Card.Content
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text>
            {newDate.toLocaleDateString([], {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </Text>
          <Button
            onPress={showDatePicker}
            mode="contained"
            style={styles.button}
          >
            Pick Date
          </Button>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>
            {newDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Button
            onPress={showTimePicker}
            mode="contained"
            style={styles.button}
          >
            Pick Time
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CustomDTPicker;
