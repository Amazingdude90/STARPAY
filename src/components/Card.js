import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

import VisaIcon from '../../assets/icons/visa-icon.svg';
import EyeIcon from '../../assets/icons/eye-icon.svg';

const Card = ({ card }) => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: card.color || '#EDE9FE' },
      ]}
    >
      {/* TOP: Debit Card or Credit Card */}
      <View style={styles.topSection}>
        <Text style={styles.cardLabel}>
          {card.type || 'Debit Card'}
        </Text>
      </View>

      {/* MIDDLE: Balance, Amount and Eye Icon */}
      <View style={styles.middleSection}>
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>
            {card.title || 'Total Balance'}
          </Text>

          <Text
            style={styles.amount}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {showBalance ? card.amount : '••••••'}
          </Text>
        </View>

        <Pressable
          style={styles.eyeButton}
          onPress={() => setShowBalance((previous) => !previous)}
          accessibilityRole="button"
          accessibilityLabel={
            showBalance ? 'Hide balance' : 'Show balance'
          }
        >
          <EyeIcon width={18} height={18} />
        </Pressable>
      </View>

      {/* BOTTOM: VISA Left, Date Right */}
      <View style={styles.bottomSection}>
        <VisaIcon width={34} height={20} />

        <Text style={styles.date}>
          {card.date || '12/28'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 220,
    padding: 14,
    borderRadius: 14,
    justifyContent: 'space-between',
    marginRight: 0,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },

  middleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  balanceSection: {
    flex: 1,
    marginRight: 6,
  },

  balanceLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 5,
  },

  amount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222222',
  },

  eyeButton: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    top:10,
  },

  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  date: {
    fontSize: 11,
    fontWeight: '600',
    color: '#444444',
  },
});

export default Card;