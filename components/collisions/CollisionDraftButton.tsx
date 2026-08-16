import CustomAlertDialog from "@/components/misc/CustomAlertDialog";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useCollisionStore } from "@/store/collisionStore";
import { usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Button } from "react-native-paper";

type CollisionDraftButtonProps = {
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
  children?: string;
};

const CollisionDraftButton = ({
  mode = "contained",
  style,
  compact = false,
  children = "Save for Later",
}: CollisionDraftButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { collision } = useCollisionFormStore();
  const { upsertCollision } = useCollisionStore();
  const [dialogVisible, setDialogVisible] = useState(false);

  const saveForLater = () => {
    const draftCollision = {
      ...collision,
      savePoint: pathname,
    };
    upsertCollision(draftCollision);
    setDialogVisible(true);
  };

  return (
    <>
      <Button
        mode={mode}
        onPress={saveForLater}
        style={style || { marginTop: 10 }}
        icon="content-save"
        compact={compact}
      >
        {children}
      </Button>
      <CustomAlertDialog
        title="Saved Draft"
        message="Your progress has been saved. You can continue filling out the form later."
        isInfo
        isDialogVisible={dialogVisible}
        onSuccess={() => {
          setDialogVisible(false);
          router.dismissTo("/");
        }}
      />
    </>
  );
};

export default CollisionDraftButton;
