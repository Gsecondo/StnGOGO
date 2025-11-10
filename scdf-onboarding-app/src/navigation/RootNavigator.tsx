import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { OverviewScreen } from '../screens/OverviewScreen';
import { ServiceScreen } from '../screens/ServiceScreen';
import { colors } from '../theme';

export type RootTabParamList = {
  Overview: undefined;
  EMS: undefined;
  FRS: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.accentEMS,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.outline,
    notification: colors.accentFRS,
  },
};

const TabLabel = ({ title, focused }: { title: string; focused: boolean }) => (
  <Text
    style={{
      color: focused ? colors.textPrimary : colors.textSecondary,
      fontWeight: focused ? '700' : '500',
    }}
  >
    {title}
  </Text>
);

const EMSRoute = () => <ServiceScreen serviceId="ems" />;
const FRSRoute = () => <ServiceScreen serviceId="frs" />;

export const RootNavigator = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        initialRouteName="Overview"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.outline,
            paddingVertical: 8,
            height: 70,
          },
        }}
      >
        <Tab.Screen
          name="Overview"
          component={OverviewScreen}
          options={{
            tabBarLabel: ({ focused }) => <TabLabel title="Overview" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="EMS"
          component={EMSRoute}
          options={{
            tabBarLabel: ({ focused }) => <TabLabel title="EMS" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="FRS"
          component={FRSRoute}
          options={{
            tabBarLabel: ({ focused }) => <TabLabel title="FRS" focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
