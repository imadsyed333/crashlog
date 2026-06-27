import { CollisionList } from "@/components/collisions/CollisionList";
import CustomFAB from "@/components/misc/CustomFAB";
import ScreenContainer from "@/components/misc/ScreenContainer";
import UserVehicleView from "@/components/vehicles/UserVehicleView";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Divider, Text } from "react-native-paper";

export default function Index() {
  const { resetForm } = useCollisionFormStore();
  const router = useRouter();

  const addCollision = () => {
    resetForm();
    router.navigate("/collisions/form/safetyScreen");
  };
  return (
    <ScreenContainer gestureEnabled={false} title="CrashLog" backButton={false}>
      <View style={{ marginBottom: 20 }}>
        <Text
          variant="titleSmall"
          style={{ marginBottom: 10, fontWeight: "600", opacity: 0.7 }}
        >
          My Vehicle
        </Text>
        <UserVehicleView />
      </View>

      <Divider style={{ marginBottom: 20 }} />

      <View style={{ flex: 1 }}>
        <Text
          variant="titleLarge"
          style={{ marginBottom: 16, fontWeight: "700" }}
        >
          My Collisions
        </Text>
        <CollisionList />
      </View>
      <CustomFAB icon="plus" label="Add Collision" handlePress={addCollision} />
    </ScreenContainer>
  );
}
