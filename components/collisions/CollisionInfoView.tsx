import { Collision } from "@/lib/types";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { Divider, IconButton, Text } from "react-native-paper";
import MediaList from "../media/MediaList";
import VehicleCard from "../vehicles/VehicleCard";
import WitnessCard from "../witnesses/WitnessCard";
import CollisionDetailsCard from "./CollisionDetailsCard";

type CollisionInfoViewProps = {
  collision: Collision;
  showActions?: boolean;
};

const CollisionInfoView = ({
  collision,
  showActions = false,
}: CollisionInfoViewProps) => {
  const { vehicles, witnesses, media } = collision;

  const router = useRouter();

  const handleEditDetails = () => {
    router.navigate({
      pathname: "/collisions/form/detailsFormScreen",
      params: {
        mode: "edit",
      },
    });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* Collision Details */}
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text variant="titleLarge">Details</Text>
          {showActions && (
            <IconButton icon="pencil" onPress={handleEditDetails} />
          )}
        </View>
        <Divider bold />
        <View style={{ marginTop: 10 }}>
          <CollisionDetailsCard collision={collision} />
        </View>
      </View>

      {/* Media */}
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text variant="titleLarge" style={{ marginTop: 10 }}>
            Media
          </Text>
          {showActions && (
            <IconButton
              icon="pencil"
              onPress={() => {
                router.navigate({
                  pathname: "/collisions/form/mediaListScreen",
                  params: {
                    mode: "edit",
                  },
                });
              }}
            />
          )}
        </View>
        <Divider bold />
        <View style={{ marginTop: 10 }}>
          <MediaList media={media} />
        </View>
      </View>

      {/* Vehicles */}
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text variant="titleLarge" style={{ marginTop: 10 }}>
            Vehicles
          </Text>
          {showActions && (
            <IconButton
              icon="pencil"
              onPress={() => {
                router.navigate({
                  pathname: "/collisions/form/vehicleListScreen",
                  params: {
                    mode: "edit",
                  },
                });
              }}
            />
          )}
        </View>
        <Divider bold style={{ marginBottom: 10 }} />
        <View>
          {vehicles.length === 0 && (
            <Text variant="bodyMedium" style={{ fontStyle: "italic" }}>
              No vehicles added.
            </Text>
          )}
          {vehicles.map((vehicle, index) => (
            <VehicleCard vehicle={vehicle} key={vehicle.id} index={index} />
          ))}
        </View>
      </View>

      {/* Witnesses */}
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text variant="titleLarge" style={{ marginTop: 10 }}>
            Witnesses
          </Text>
          {showActions && (
            <IconButton
              icon="pencil"
              onPress={() => {
                router.navigate({
                  pathname: "/collisions/form/witnessListScreen",
                  params: {
                    mode: "edit",
                  },
                });
              }}
            />
          )}
        </View>
        <Divider bold style={{ marginBottom: 10 }} />
        <View>
          {witnesses.length === 0 && (
            <Text variant="bodyMedium" style={{ fontStyle: "italic" }}>
              No witnesses added.
            </Text>
          )}
          {witnesses.map((witness, index) => (
            <WitnessCard witness={witness} key={witness.id} index={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CollisionInfoView;
