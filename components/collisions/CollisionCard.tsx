import { Collision } from "@/lib/types";
import { useCollisionFormStore } from "@/store/collisionFormStore";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";

type CollisionCardProps = {
  collision: Collision;
};

export const CollisionCard = ({ collision }: CollisionCardProps) => {
  const { location, date, description, vehicles, witnesses, media } = collision;
  const { setForm } = useCollisionFormStore();
  const router = useRouter();
  const theme = useTheme();
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const formattedTime = newDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const summaryItems = [
    {
      icon: "car",
      label: `${vehicles.length} vehicle${vehicles.length === 1 ? "" : "s"}`,
    },
    {
      icon: "account-group",
      label: `${witnesses.length} witness${witnesses.length === 1 ? "" : "es"}`,
    },
    {
      icon: "camera",
      label: `${media.length} photo${media.length === 1 ? "" : "s"}`,
    },
  ];

  const handlePress = () => {
    router.navigate(`/collisions/${collision.id}`);
    setForm(collision);
  };

  return (
    <Card mode="contained" onPress={handlePress} style={{ marginBottom: 10 }}>
      <Card.Content style={{ paddingBottom: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text variant="titleLarge" style={{ fontWeight: 600 }}>
              {location}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
            >
              {formattedDate} at {formattedTime}
            </Text>
          </View>
        </View>
        {!!description && (
          <Text
            variant="bodyLarge"
            numberOfLines={2}
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {description}
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            marginTop: description ? 12 : 0,
          }}
        >
          {summaryItems.map((item) => (
            <View
              key={item.label}
              style={{
                backgroundColor: theme.colors.secondaryContainer,
                borderRadius: 999,
                paddingHorizontal: 10,
                paddingVertical: 5,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon
                source={item.icon}
                size={14}
                color={theme.colors.onSecondaryContainer}
              />
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.onSecondaryContainer }}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};
