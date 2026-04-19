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
  const dateButtonLabel = newDate.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeButtonLabel = newDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

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
          <Text variant="bodyMedium">When did the collision happen?</Text>
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
          <Text variant="bodyMedium">When did the collision happen?</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              marginHorizontal: 4,
            }}
          >
            <Button
              onPress={showDatePicker}
              mode="contained"
              style={styles.button}
              buttonColor={paperTheme.colors.elevation.level2}
              textColor={paperTheme.colors.onSurface}
            >
              {dateButtonLabel}
            </Button>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 4,
            }}
          >
            <Button
              onPress={showTimePicker}
              mode="contained"
              style={styles.button}
              buttonColor={paperTheme.colors.elevation.level2}
              textColor={paperTheme.colors.onSurface}
            >
              {timeButtonLabel}
            </Button>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CustomDTPicker;
