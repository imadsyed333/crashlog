import { AddCollisionButton } from "@/components/collisions/AddCollisionButton";
import { CollisionList } from "@/components/collisions/CollisionList";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CollisionList />
      <AddCollisionButton />
    </View>
  );
}
