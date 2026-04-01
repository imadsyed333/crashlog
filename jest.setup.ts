import { act } from "@testing-library/react-native";

import { resetAllStores } from "./__tests__/testUtils/resetStores";

const mockRouter = {
  navigate: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
};

const mockUseLocalSearchParams = jest.fn(() => ({}));

jest.mock("react-native-get-random-values");

jest.mock("expo-font", () => ({
  isLoaded: jest.fn(() => true),
  loadAsync: jest.fn(() => Promise.resolve()),
  renderToImageAsync: jest.fn(() => Promise.resolve("")),
}));

jest.mock("expo-router", () => {
  const React = require("react");

  const Stack = Object.assign(
    ({ children }: { children?: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    {
      Screen: () => null,
    },
  );

  return {
    __esModule: true,
    Stack,
    router: mockRouter,
    useRouter: () => mockRouter,
    useLocalSearchParams: mockUseLocalSearchParams,
    __mockRouter: mockRouter,
    __mockUseLocalSearchParams: mockUseLocalSearchParams,
  };
});

jest.mock("react-native-mask-text", () => {
  const React = require("react");
  const { TextInput } = require("react-native");

  return {
    MaskedTextInput: ({ onChangeText, value, ...props }: any) =>
      React.createElement(TextInput, {
        ...props,
        value,
        onChangeText,
      }),
  };
});

jest.mock("react-native-modal", () => {
  const React = require("react");

  return {
    __esModule: true,
    default: ({ isVisible, children }: any) =>
      isVisible ? React.createElement(React.Fragment, null, children) : null,
  };
});

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return new Proxy(
    {},
    {
      get:
        (_target, iconSetName) =>
        ({ name, children, ...props }: any) =>
          React.createElement(
            Text,
            props,
            children ?? (typeof name === "string" ? name : String(iconSetName)),
          ),
    },
  );
});

jest.mock("@expo/vector-icons/MaterialCommunityIcons", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    __esModule: true,
    default: ({ name, children, ...props }: any) =>
      React.createElement(Text, props, children ?? name ?? "icon"),
  };
});

jest.mock("react-native-swipe-list-view", () => {
  const React = require("react");

  return {
    SwipeListView: ({ data, renderItem, renderHiddenItem }: any) =>
      React.createElement(
        React.Fragment,
        null,
        data.map((item: any, index: number) =>
          React.createElement(
            React.Fragment,
            { key: item.id ?? index },
            renderItem({ item, index }),
            renderHiddenItem ? renderHiddenItem({ item, index }) : null,
          ),
        ),
      ),
  };
});

afterEach(() => {
  jest.clearAllMocks();
  mockUseLocalSearchParams.mockReturnValue({});
  act(() => {
    resetAllStores();
  });
});
