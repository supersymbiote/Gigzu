import { icons } from '@/constants/icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconSource =
          route.name === 'index'
            ? icons.home
            : route.name === 'add'
            ? icons.image
            : route.name === 'saved'
            ? icons.save
            : icons.person;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.8}
          >
            {isFocused ? (
              <View style={styles.activeItem}>
                <View style={styles.activeBubble}>
                  <Image source={iconSource} style={[styles.icon, { tintColor: '#ffffff' }]} />
                  <Text style={styles.activeLabel}>{label}</Text>
                </View>
              </View>
            ) : (
              <Image source={iconSource} style={[styles.icon, { tintColor: '#6b7280' }]} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const _Layout = () => {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />}> 
      <Tabs.Screen 
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
            <Tabs.Screen 
        name="add"
        options={{
          title: 'Add',
          headerShown: false,
        }}
      />
            <Tabs.Screen 
        name="saved"
        options={{
          title: 'Saved',
          headerShown: false,
        }}
      />
            <Tabs.Screen 
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
        }}
      />
    </Tabs>

  );
};

export default _Layout;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  activeItem: {
    alignItems: 'center',
  },
  activeBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
  },
  activeLabel: {
    marginLeft: 8,
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
});