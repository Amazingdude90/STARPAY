import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import transferContacts from '../data/transferContacts';

export default function TransferSection({
  onContactPress,
  onSeeAll,
}) {
  const handleAddContact = () => {
    Alert.alert(
      'Add Contact',
      'Contact management can be connected here.'
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transfer</Text>

        <TouchableOpacity
          onPress={onSeeAll}
          activeOpacity={0.7}
        >
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contacts}
      >
        <TouchableOpacity
          style={styles.contact}
          onPress={handleAddContact}
          activeOpacity={0.7}
        >
          <View style={styles.addCircle}>
            <Text style={styles.plus}>+</Text>
          </View>

          <Text style={styles.name}>Add</Text>
        </TouchableOpacity>

        {transferContacts.map((person) => (
          <TouchableOpacity
            key={person.id}
            style={styles.contact}
            onPress={() => onContactPress?.(person)}
            activeOpacity={0.7}
          >
            <Image
              source={person.image}
              style={styles.avatar}
              resizeMode="cover"
            />

            <Text style={styles.name}>{person.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 23,
    fontWeight: '700',
    color: '#242424',
  },

  seeAll: {
    fontSize: 15,
    fontWeight: '600',
    color: '#777777',
  },

  contacts: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 22,
    paddingBottom: 8,
    paddingRight: 10,
  },

  contact: {
    alignItems: 'center',
    width: 62,
  },

  addCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#C58ACB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  plus: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
    marginTop: -2,
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#EEEEEE',
  },

  name: {
    marginTop: 9,
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});