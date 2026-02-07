import { CollisionList } from "@/components/collisions/CollisionList";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { Stack, useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();

  const { resetForm } = useCollisionFormStore();
  const router = useRouter();

  const handlePress = () => {
    resetForm();
    router.navigate("/collisions/form/collisionDetailsFormScreen");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: insets.bottom,
      }}
    >
      <Stack.Screen
        options={{
          title: "My Collisions",
          gestureEnabled: false,
          headerBackVisible: false,
          headerRight: () => (
            <Button icon={"plus"} textColor="white" onPress={handlePress}>
              Add Collision
            </Button>
          ),
        }}
      />
      <CollisionList />
    </View>
  );
}
