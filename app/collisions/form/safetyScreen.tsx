import ScreenContainer from "@/components/misc/ScreenContainer";
import { styles } from "@/lib/themes";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, Icon, Text, useTheme } from "react-native-paper";

const SafetyScreen = () => {
  const theme = useTheme();
  const router = useRouter();

  const handleContinue = () => {
    router.navigate("/collisions/form/detailsFormScreen");
  };

  return (
    <ScreenContainer
      gestureEnabled={false}
      title="Safety First"
      description="Follow these steps before documenting the collision."
      backButton
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 16,
        }}
      >
        {/* Emergency Services - Most Critical */}
        <Card
          mode="contained"
          style={{
            marginBottom: 16,
            backgroundColor: theme.colors.errorContainer,
          }}
        >
          <Card.Content style={{ padding: 16 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Icon
                source="alert-circle"
                size={24}
                color={theme.colors.error}
              />
              <Text
                variant="titleMedium"
                style={{
                  color: theme.colors.error,
                  fontFamily: "Inter_600SemiBold",
                  marginLeft: 8,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Call 911 Immediately If:
              </Text>
            </View>
            <View style={{ gap: 6, marginLeft: 32 }}>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onErrorContainer }}
              >
                • Anyone is injured or in pain
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onErrorContainer }}
              >
                • There is a fire or hazardous materials
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onErrorContainer }}
              >
                • Vehicles are blocking traffic
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Step-by-step Safety Checklist */}
        <Text
          variant="titleSmall"
          style={{
            color: theme.colors.onSurfaceVariant,
            marginBottom: 12,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Safety Checklist
        </Text>

        {/* Step 1: Check surroundings */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: theme.colors.primaryContainer,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 12,
            }}
          >
            <Text
              variant="labelLarge"
              style={{
                color: theme.colors.onPrimaryContainer,
                fontFamily: "Inter_600SemiBold",
              }}
            >
              1
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <Icon
                source="car-brake-alert"
                size={20}
                color={theme.colors.primary}
              />
              <Text
                variant="titleMedium"
                style={{
                  color: theme.colors.onSurface,
                  fontFamily: "Inter_600SemiBold",
                  marginLeft: 6,
                }}
              >
                Assess danger
              </Text>
            </View>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Move vehicles to a safe location if possible. Turn on hazard
              lights.
            </Text>
          </View>
        </View>

        {/* Step 2: Check for injuries */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: theme.colors.primaryContainer,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 12,
            }}
          >
            <Text
              variant="labelLarge"
              style={{
                color: theme.colors.onPrimaryContainer,
                fontFamily: "Inter_600SemiBold",
              }}
            >
              2
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <Icon
                source="hospital-box"
                size={20}
                color={theme.colors.primary}
              />
              <Text
                variant="titleMedium"
                style={{
                  color: theme.colors.onSurface,
                  fontFamily: "Inter_600SemiBold",
                  marginLeft: 6,
                }}
              >
                Check for injuries
              </Text>
            </View>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Check yourself and all passengers. Do not move injured persons
              unless necessary.
            </Text>
          </View>
        </View>

        {/* Step 3: Stay calm */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: theme.colors.primaryContainer,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 12,
            }}
          >
            <Text
              variant="labelLarge"
              style={{
                color: theme.colors.onPrimaryContainer,
                fontFamily: "Inter_600SemiBold",
              }}
            >
              3
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <Icon
                source="heart-pulse"
                size={20}
                color={theme.colors.primary}
              />
              <Text
                variant="titleMedium"
                style={{
                  color: theme.colors.onSurface,
                  fontFamily: "Inter_600SemiBold",
                  marginLeft: 6,
                }}
              >
                Stay calm
              </Text>
            </View>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Take deep breaths. You're safe now and this app will guide you
              through documentation.
            </Text>
          </View>
        </View>
      </ScrollView>

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleContinue}
        icon="arrow-right"
        contentStyle={{
          flexDirection: "row-reverse",
        }}
      >
        I'm Safe — Continue
      </Button>
    </ScreenContainer>
  );
};

export default SafetyScreen;
