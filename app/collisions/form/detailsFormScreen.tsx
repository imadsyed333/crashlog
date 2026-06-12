import CustomDTPicker from "@/components/datetime/CustomDTPicker";
import ErrorBox from "@/components/misc/ErrorBox";
import ScreenContainer from "@/components/misc/ScreenContainer";
import { detailsSchema } from "@/lib/schemas";
import { styles } from "@/lib/themes";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import z from "zod";

import CollisionDraftButton from "@/components/collisions/CollisionDraftButton";
import * as Location from "expo-location";

type FormErrors = {
  location?: String[];
  description?: String[];
};

const DetailsFormScreen = () => {
  const { collision, updateCollisionField } = useCollisionFormStore();
  const theme = useTheme();

  const { location, description } = collision;
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const router = useRouter();

  const { mode } = useLocalSearchParams<{ mode?: string }>();

  const handlePress = () => {
    const parse = detailsSchema.safeParse({ location, description });
    if (!parse.success) {
      const errors = z.flattenError(parse.error);
      setFormErrors(errors.fieldErrors);
    } else {
      if (mode === "edit") {
        router.back();
      } else {
        router.navigate("/collisions/form/mediaListScreen");
      }
    }
  };

  const fetchLocation = async () => {
    if (isFetchingLocation) return;

    setIsFetchingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Permission to access location is required.",
        );
        return;
      }

      const locationData = await Location.getCurrentPositionAsync({});

      const geocode = await Location.reverseGeocodeAsync(locationData.coords);

      updateCollisionField("location", {
        description: geocode[0]
          ? `${geocode[0].streetNumber} ${geocode[0].street}, ${geocode[0].city}`
          : "",
        coordinates: {
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        },
      });
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setIsFetchingLocation(false);
    }
  };

  return (
    <ScreenContainer
      title="Details"
      description="Provide as much detail as possible about the collision."
      backButton
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <TextInput
          error={!!formErrors.location}
          label={'Where are you? (Ex. "near Jane and Finch")'}
          value={location.description}
          onChangeText={(text) => {
            updateCollisionField("location", {
              ...location,
              description: text,
            });
            setFormErrors({
              ...formErrors,
              location: undefined,
            });
          }}
          style={styles.input}
          mode="flat"
          right={
            isFetchingLocation ? (
              <TextInput.Icon
                icon={() => (
                  <ActivityIndicator
                    size="small"
                    color={theme.colors.primary}
                    accessibilityLabel="Fetching current location"
                    testID="location-loading-indicator"
                  />
                )}
                accessibilityLabel="Fetching current location"
                disabled
              />
            ) : (
              <TextInput.Icon
                icon="map-marker"
                onPress={fetchLocation}
                accessibilityLabel="Use current location"
                testID="location-fetch-icon"
              />
            )
          }
        />
        <ErrorBox errors={formErrors.location} />
        <TextInput
          error={!!formErrors.description}
          label={"What happened? (Ex. 'A car ran a red light and hit me')"}
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
          mode="flat"
        />
        <ErrorBox errors={formErrors.description} />
        <View
          style={{
            marginTop: 10,
          }}
        >
          <CustomDTPicker />
        </View>
      </View>
      {mode === "edit" ? (
        <Button
          mode="contained"
          style={styles.button}
          onPress={handlePress}
          icon="content-save"
        >
          Save Changes
        </Button>
      ) : (
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginVertical: 10,
          }}
        >
          <CollisionDraftButton
            mode="outlined"
            style={{ flex: 1 }}
            children="Save Draft"
          />
          <Button
            mode="contained"
            style={{ flex: 2 }}
            onPress={handlePress}
            icon="arrow-right"
            contentStyle={{
              flexDirection: "row-reverse",
            }}
          >
            Next
          </Button>
        </View>
      )}
    </ScreenContainer>
  );
};

export default DetailsFormScreen;
