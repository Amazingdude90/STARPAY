
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

const IncomeSpendingCards = () => {
  return (
    <View style={styles.container}>
      {/* Income */}
      <View style={[styles.card, styles.incomeCard]}>
        <View style={styles.iconContainer}>
          <TrendingUp size={20} color="#16A34A" />
        </View>

        <Text style={styles.label}>Income</Text>
        <Text style={styles.amount}>$23,000</Text>
      </View>

      {/* Spending */}
      <View style={[styles.card, styles.spendingCard]}>
        <View style={styles.iconContainer}>
          <TrendingDown size={20} color="#E53935" />
        </View>

        <Text style={styles.label}>Spending</Text>
        <Text style={styles.amount}>$17,000</Text>
      </View>
    </View>
  );
};

export default IncomeSpendingCards;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 0,
    marginBottom: 20,
  },

  card: {
    flex: 1,
    minWidth: 0,
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
  },

  incomeCard: {
    backgroundColor: '#F0FDF4',
    borderColor: '#DCFCE7',
  },

  spendingCard: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FEE2E2',
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 7,
  },

  amount: {
    fontSize: 21,
    fontWeight: '700',
    color: '#252231',
  },
});
