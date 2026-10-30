import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const transactions = [
  {
    id: '1',
    title: 'Transfer to Siti',
    date: 'Today, 08:27 PM',
    amount: '-$326',
    type: 'transfer',
  },
  {
    id: '2',
    title: 'Coffee',
    date: 'Today',
    amount: '-$22',
    type: 'coffee',
  },
];

const TransactionSection = () => {
  const handleSeeAll = () => {
    console.log('View all transactions');
  };

  return (
    <View style={styles.container}>
      {/* Heading */}
      <View style={styles.header}>
        <Text style={styles.title}>Transaction</Text>

        <TouchableOpacity
          onPress={handleSeeAll}
          activeOpacity={0.7}
        >
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction history */}
      <View style={styles.list}>
        {transactions.map((transaction) => (
          <TouchableOpacity
            key={transaction.id}
            style={styles.transactionRow}
            activeOpacity={0.7}
            onPress={() =>
              console.log('Selected transaction:', transaction.title)
            }
          >
            {/* Transaction icon */}
            <View
              style={[
                styles.iconCircle,
                transaction.type === 'transfer'
                  ? styles.transferIcon
                  : styles.coffeeIcon,
              ]}
            >
              <Text style={styles.iconText}>
                {transaction.type === 'transfer' ? '↗' : '☕'}
              </Text>
            </View>

            {/* Transaction details */}
            <View style={styles.details}>
              <Text style={styles.transactionTitle}>
                {transaction.title}
              </Text>

              <Text style={styles.date}>
                {transaction.date}
              </Text>
            </View>

            {/* Debit amount */}
            <Text style={styles.amount}>
              {transaction.amount}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 28,
    marginBottom: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#242424',
  },

  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },

  list: {
    gap: 18,
  },

  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 66,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  transferIcon: {
    backgroundColor: '#F0E8FF',
  },

  coffeeIcon: {
    backgroundColor: '#FFF0E6',
  },

  iconText: {
    fontSize: 21,
    color: '#5C3A80',
  },

  details: {
    flex: 1,
    justifyContent: 'center',
  },

  transactionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#252525',
  },

  date: {
    marginTop: 5,
    fontSize: 12,
    color: '#929292',
  },
 amount: {
  fontSize: 15,
  fontWeight: '700',
  color: '#E53935',
  marginLeft: 8,
},
});

export default TransactionSection;