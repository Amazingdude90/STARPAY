
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';

import {
  House,
  ChartNoAxesColumn,
  Wallet,
  UserRound,
} from 'lucide-react-native';

const tabs = [
  { name: 'Home', Icon: House },
  { name: 'Statistics', Icon: ChartNoAxesColumn },
  { name: 'Wallet', Icon: Wallet },
  { name: 'Profile', Icon: UserRound },
];

const BottomNavigation = ({ onTabPress }) => {
  const [activeTab, setActiveTab] = useState('Home');

  const animations = useRef(
    tabs.reduce((acc, tab) => {
      acc[tab.name] = new Animated.Value(
        tab.name === 'Home' ? 1 : 0
      );
      return acc;
    }, {})
  ).current;

  useEffect(() => {
    tabs.forEach((tab) => {
      Animated.spring(animations[tab.name], {
        toValue: tab.name === activeTab ? 1 : 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    });
  }, [activeTab, animations]);

  const handlePress = (tabName) => {
    setActiveTab(tabName);

    if (onTabPress) {
      onTabPress(tabName);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.navBar}>
        {tabs.map(({ name, Icon }) => {
          const isActive = activeTab === name;
          const animation = animations[name];

          const iconScale = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.12],
          });

          const indicatorOpacity = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          });

          return (
            <TouchableOpacity
              key={name}
              style={styles.tab}
              activeOpacity={0.75}
              onPress={() => handlePress(name)}
              accessibilityRole="button"
              accessibilityLabel={name}
              accessibilityState={{ selected: isActive }}
            >
              <Animated.View
                style={[
                  styles.iconContainer,
                  {
                    transform: [{ scale: iconScale }],
                  },
                ]}
              >
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.activeBackground,
                    { opacity: indicatorOpacity },
                  ]}
                />

                <Icon
                  size={23}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  color={isActive ? '#8B5CF6' : '#92929D'}
                />
              </Animated.View>

              <Text
                style={[
                  styles.label,
                  isActive && styles.activeLabel,
                ]}
              >
                {name}
              </Text>

              <Animated.View
                style={[
                  styles.activeDot,
                  { opacity: indicatorOpacity },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F0F5',
  },

  navBar: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 5,

    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: '#30234A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
      },
    }),
  },

  tab: {
    flex: 1,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    gap: 3,
  },

  iconContainer: {
    width: 48,
    height: 34,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F0E9FF',
    borderRadius: 14,
  },

  label: {
    fontSize: 10,
    fontWeight: '500',
    color: '#92929D',
  },

  activeLabel: {
    color: '#8B5CF6',
    fontWeight: '700',
  },

  activeDot: {
    position: 'absolute',
    bottom: 0,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#8B5CF6',
  },
});

export default BottomNavigation;
