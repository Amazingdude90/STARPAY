import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import colors from '../constants/colors';
import BellIcon from '../../assets/icons/bell-icon.svg';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          source={require('../../assets/images/avatar.png')}
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>
            Good Evening
          </Text>

          <Text style={styles.subText}>
            Nicolas Smith
          </Text>
        </View>
      </View>
      <View style={styles.bellContainer}>
        <BellIcon
          width={32}
          height={32}
          color={colors.text}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  greeting: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.gray,
  },

  subText: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },

  bellContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});