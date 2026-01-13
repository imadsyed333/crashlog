import { useCollisionFormStore } from "@/store/collisionFormStore";
import React from "react";
import { View } from "react-native";
import { Divider, Text } from "react-native-paper";
import MediaList from "../media/MediaList";
import VehicleCard from "../vehicles/VehicleCard";
import WitnessCard from "../witnesses/WitnessCard";
import CollisionDetailsCard from "./CollisionDetailsCard";

const CollisionInfoView = () => {
  const { collision } = useCollisionFormStore();
  const { vehicles, witnesses } = collision;

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text variant="titleLarge" style={{ marginLeft: 10, marginTop: 10 }}>
          Details
        </Text>
        <Divider bold style={{ marginHorizontal: 10 }} />
        <CollisionDetailsCard />
      </View>
      <View>
        <Text variant="titleLarge" style={{ marginLeft: 10, marginTop: 10 }}>
          Media
        </Text>
        <Divider bold style={{ marginHorizontal: 10 }} />
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          <MediaList />
        </View>
      </View>
      <View>
        <Text variant="titleLarge" style={{ marginLeft: 10, marginTop: 10 }}>
          Vehicles
        </Text>
        <Divider bold style={{ marginHorizontal: 10 }} />
        <View>
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
        <Divider bold style={{ marginHorizontal: 10 }} />
        <View>
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
    </View>
  );
};

export default CollisionInfoView;
