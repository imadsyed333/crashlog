import { CollisionList } from "@/components/collisions/CollisionList";
import CustomFAB from "@/components/misc/CustomFAB";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();

  const { resetForm } = useCollisionFormStore();
  const router = useRouter();

  const handleFABPress = () => {
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
      <CollisionList />
      <CustomFAB
        handlePress={handleFABPress}
        icon="plus"
        label="Add Collision"
      />
    </View>
  );
}
