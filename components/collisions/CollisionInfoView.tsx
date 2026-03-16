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
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text variant="titleLarge" style={{ marginLeft: 10, marginTop: 10 }}>
            Details
          </Text>
          {showActions && (
            <IconButton icon="pencil" onPress={handleEditDetails} />
          )}
        </View>
        <Divider bold style={{ marginHorizontal: 10 }} />
        <CollisionDetailsCard collision={collision} />
      </View>
      <View>
        <Text variant="titleLarge" style={{ marginLeft: 10, marginTop: 10 }}>
          Media
        </Text>
        <Divider bold style={{ marginHorizontal: 10 }} />
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          <MediaList media={media} />
        </View>
      </View>
      <View>
        <Text variant="titleLarge" style={{ marginLeft: 10, marginTop: 10 }}>
          Vehicles
        </Text>
        <Divider bold style={{ marginHorizontal: 10, marginBottom: 10 }} />
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              vehicle={vehicle}
              key={vehicle.id}
              showActions={showActions}
              index={index}
            />
          ))}
        </View>
      </View>
      <View>
        <Text variant="titleLarge" style={{ marginLeft: 10, marginTop: 10 }}>
          Witnesses
        </Text>
        <Divider bold style={{ marginHorizontal: 10, marginBottom: 10 }} />
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          {witnesses.map((witness, index) => (
            <WitnessCard
              witness={witness}
              key={witness.id}
              showActions={showActions}
              index={index}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CollisionInfoView;
