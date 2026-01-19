import { Collision } from "@/lib/types";
import React from "react";
import { ScrollView, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import MediaList from "../media/MediaList";
import VehicleCard from "../vehicles/VehicleCard";
import WitnessCard from "../witnesses/WitnessCard";
import CollisionDetailsCard from "./CollisionDetailsCard";

type CollisionInfoViewProps = {
  collision: Collision;
};

const CollisionInfoView = ({ collision }: CollisionInfoViewProps) => {
  const { vehicles, witnesses, media } = collision;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Text variant="titleLarge" style={{ marginLeft: 10, marginTop: 10 }}>
          Details
        </Text>
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
              showActions={false}
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
              showActions={false}
              index={index}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CollisionInfoView;
