import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import RNDateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Platform, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

const CustomDTPicker = () => {
  const { collision, updateCollisionField } = useCollisionFormStore();
  const { date } = collision;

  const newDate = new Date(date);

  const setDate = (event: DateTimePickerEvent, date: Date | undefined) => {
    updateCollisionField("date", date || new Date());
  };

  if (Platform.OS === "ios") {
    return (
      <RNDateTimePicker
        value={new Date(date)}
        onChange={(e, date) => setDate(e, date!)}
        mode="datetime"
        textColor="black"
        style={styles.datetimepicker}
      />
    );
  } else {
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

    return (
      <Card mode="outlined">
        <Card.Content>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
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
            <Text>
              {newDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onPress={showDatePicker}
              mode="contained"
              style={styles.button}
            >
              Pick Date
            </Button>
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
  }
};

export default CustomDTPicker;
