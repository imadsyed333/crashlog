import { CollisionList } from "@/components/collisions/CollisionList";
import CustomFAB from "@/components/misc/CustomFAB";
import ScreenContainer from "@/components/misc/ScreenContainer";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useRouter } from "expo-router";

export default function Index() {
  const { resetForm } = useCollisionFormStore();
  const router = useRouter();

  const handlePress = () => {
    resetForm();
    router.navigate("/collisions/form/detailsFormScreen");
  };
  return (
    <ScreenContainer
      gestureEnabled={false}
      title="My Collisions"
      backButton={false}
    >
      <CollisionList />
      <CustomFAB icon="plus" label="Add Collision" handlePress={handlePress} />
    </ScreenContainer>
  );
}
