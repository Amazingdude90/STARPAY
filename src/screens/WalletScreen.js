import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
} from 'react-native';

import {
  Bell,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  Smartphone,
  ReceiptText,
  Plus,
  ShoppingBag,
  Coffee,
  ChevronRight,
  Wallet as WalletIcon,
  ArrowDownToLine,
} from 'lucide-react-native';

import { colors } from '../constants/colors';

const transactions = [
  {
    id: '1',
    title: 'Shopping',
    subtitle: 'Today, 10:45 AM',
    amount: '-$120.00',
    type: 'debit',
    icon: ShoppingBag,
    iconColor: '#8B5CF6',
    iconBackground: '#F0EAFE',
  },
  {
    id: '2',
    title: 'Salary Payment',
    subtitle: 'Today, 9:20 AM',
    amount: '+$2,500.00',
    type: 'credit',
    icon: ArrowDownToLine,
    iconColor: '#16A34A',
    iconBackground: '#E9F9EF',
  },
  {
    id: '3',
    title: 'Coffee Shop',
    subtitle: 'Yesterday, 4:15 PM',
    amount: '-$18.50',
    type: 'debit',
    icon: Coffee,
    iconColor: '#D97706',
    iconBackground: '#FFF5E5',
  },
];

const WalletScreen = ({ onTransfer }) => {
  const [showBalance, setShowBalance] = useState(true);

  const accentColor = colors?.primary || '#8B5CF6';

  // Transfer opens the Transfer screen.
  // Other actions still use their placeholder alerts.
  const handleAction = (action) => {
    if (action === 'Transfer') {
      if (typeof onTransfer === 'function') {
        onTransfer();
      } else {
        Alert.alert(
          'Navigation unavailable',
          'Please connect the Transfer screen in App.js.'
        );
      }

      return;
    }

    Alert.alert(
      action,
      `${action} feature is ready for you to connect to your wallet services.`
    );
  };

  const quickActions = [
    {
      id: 'transfer',
      title: 'Transfer',
      icon: ArrowUpRight,
      color: '#FFFFFF',
      background: accentColor,
    },
    {
      id: 'receive',
      title: 'Receive',
      icon: ArrowDownLeft,
      color: '#6D43C8',
      background: '#F0EAFE',
    },
    {
      id: 'airtime',
      title: 'Airtime',
      icon: Smartphone,
      color: '#0D9488',
      background: '#E3F8F5',
    },
    {
      id: 'bills',
      title: 'Pay Bills',
      icon: ReceiptText,
      color: '#D97706',
      background: '#FFF3DF',
    },
  ];

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8F7FB"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with customer profile image */}
        <View style={styles.header}>
          <View style={styles.customerInfo}>
            <Image
              source={require('../../assets/images/avatar.png')}
              style={styles.avatar}
              resizeMode="cover"
            />

            <View>
              <Text style={styles.customerName}>
                Nicolas Smith
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.notificationButton}
            activeOpacity={0.7}
            onPress={() => handleAction('Notifications')}
          >
            <Bell size={21} color="#292536" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Wallet balance card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceCardTop}>
            <View style={styles.walletLabelContainer}>
              <View style={styles.walletIcon}>
                <WalletIcon size={19} color="#FFFFFF" />
              </View>

              <Text style={styles.walletLabel}>
                My Wallet
              </Text>
            </View>

            <TouchableOpacity
              style={styles.visibilityButton}
              activeOpacity={0.7}
              onPress={() => setShowBalance(!showBalance)}
            >
              {showBalance ? (
                <Eye size={19} color="#FFFFFF" />
              ) : (
                <EyeOff size={19} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.balanceCaption}>
            Total available balance
          </Text>

          <Text style={styles.balanceAmount}>
            {showBalance ? '$24,850.00' : '••••••••'}
          </Text>

          <View style={styles.balanceDivider} />

          <View style={styles.balanceFooter}>
            <View>
              <Text style={styles.cardNumberLabel}>
                ACCOUNT NUMBER
              </Text>

              <Text style={styles.cardNumber}>
                •••• •••• 4829
              </Text>
            </View>

            <View style={styles.activeBadge}>
              <View style={styles.activeDot} />

              <Text style={styles.activeText}>
                Active
              </Text>
            </View>
          </View>

          <View style={styles.decorCircleOne} />
          <View style={styles.decorCircleTwo} />
        </View>

        {/* Quick actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>
        </View>

        <View style={styles.actionsGrid}>
          {quickActions.map((action) => {
            const Icon = action.icon;
            const isTransfer = action.id === 'transfer';

            return (
              <TouchableOpacity
                key={action.id}
                style={styles.actionItem}
                activeOpacity={0.75}
                onPress={() => handleAction(action.title)}
              >
                <View
                  style={[
                    styles.actionIcon,
                    { backgroundColor: action.background },
                  ]}
                >
                  <Icon
                    size={23}
                    color={action.color}
                  />
                </View>

                <Text
                  style={[
                    styles.actionTitle,
                    isTransfer && { color: accentColor },
                  ]}
                >
                  {action.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Additional wallet options */}
        <View style={styles.toolsCard}>
          <TouchableOpacity
            style={styles.toolRow}
            activeOpacity={0.7}
            onPress={() => handleAction('Add Money')}
          >
            <View style={styles.toolIconContainer}>
              <Plus size={20} color="#6D43C8" />
            </View>

            <View style={styles.toolTextContainer}>
              <Text style={styles.toolTitle}>
                Add Money
              </Text>

              <Text style={styles.toolSubtitle}>
                Top up your wallet balance
              </Text>
            </View>

            <ChevronRight size={19} color="#A09AAA" />
          </TouchableOpacity>

          <View style={styles.toolDivider} />

          <TouchableOpacity
            style={styles.toolRow}
            activeOpacity={0.7}
            onPress={() => handleAction('Transaction History')}
          >
            <View style={styles.toolIconContainer}>
              <ReceiptText size={20} color="#0D9488" />
            </View>

            <View style={styles.toolTextContainer}>
              <Text style={styles.toolTitle}>
                Transaction History
              </Text>

              <Text style={styles.toolSubtitle}>
                View all your wallet activities
              </Text>
            </View>

            <ChevronRight size={19} color="#A09AAA" />
          </TouchableOpacity>
        </View>

        {/* Recent transactions */}
        <View style={styles.transactionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Recent Transactions
            </Text>

            <Text style={styles.transactionSubtitle}>
              Your latest wallet activity
            </Text>
          </View>

          <TouchableOpacity
            style={styles.viewAllButton}
            activeOpacity={0.7}
            onPress={() => handleAction('All Transactions')}
          >
            <Text style={styles.viewAllText}>
              View all
            </Text>

            <ChevronRight size={15} color="#7C4DCE" />
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsCard}>
          {transactions.map((transaction, index) => {
            const Icon = transaction.icon;

            return (
              <View key={transaction.id}>
                <TouchableOpacity
                  style={styles.transactionRow}
                  activeOpacity={0.75}
                  onPress={() => handleAction(transaction.title)}
                >
                  <View
                    style={[
                      styles.transactionIcon,
                      {
                        backgroundColor: transaction.iconBackground,
                      },
                    ]}
                  >
                    <Icon
                      size={20}
                      color={transaction.iconColor}
                    />
                  </View>

                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionName}>
                      {transaction.title}
                    </Text>

                    <Text style={styles.transactionDate}>
                      {transaction.subtitle}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.transactionAmount,
                      {
                        color:
                          transaction.type === 'credit'
                            ? '#16A34A'
                            : '#292536',
                      },
                    ]}
                  >
                    {transaction.amount}
                  </Text>
                </TouchableOpacity>

                {index < transactions.length - 1 && (
                  <View style={styles.transactionDivider} />
                )}
              </View>
            );
          })}
        </View>

        <Text style={styles.footerText}>
          Your money, managed simply.
        </Text>
      </ScrollView>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F7FB',
    marginTop: 20,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 35,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#E8DDFB',
    borderWidth: 1,
    borderColor: '#EFECF4',
  },

  greeting: {
    fontSize: 12,
    color: '#8E899B',
    marginBottom: 4,
  },

  customerName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#292536',
  },

  notificationButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFECF4',
  },

  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#F05B70',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },

  balanceCard: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#7044BE',
    padding: 22,
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: '#7044BE',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 7,
  },

  balanceCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },

  walletLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  walletIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.17)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  walletLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  visibilityButton: {
    width: 35,
    height: 35,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
  },

  balanceCaption: {
    marginTop: 26,
    fontSize: 12,
    color: '#E4D9FA',
    zIndex: 2,
  },

  balanceAmount: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.7,
    marginTop: 7,
    zIndex: 2,
  },

  balanceDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop: 24,
    marginBottom: 17,
  },

  balanceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },

  cardNumberLabel: {
    fontSize: 9,
    letterSpacing: 1.2,
    color: '#D9C8F8',
    marginBottom: 6,
  },

  cardNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 1.2,
  },

  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },

  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#86EFAC',
  },

  activeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  decorCircleOne: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'rgba(255,255,255,0.055)',
    top: -85,
    right: -55,
  },

  decorCircleTwo: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.045)',
    bottom: -90,
    right: 40,
  },

  sectionHeader: {
    marginBottom: 17,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#292536',
  },

  sectionSubtitle: {
    fontSize: 12,
    color: '#9691A2',
    marginTop: 5,
  },

  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  actionItem: {
    width: '23%',
    alignItems: 'center',
  },

  actionIcon: {
    width: 58,
    height: 58,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  actionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#494456',
    textAlign: 'center',
  },

  toolsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    paddingHorizontal: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#F0EDF5',
  },

  toolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  toolIconContainer: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#F6F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  toolTextContainer: {
    flex: 1,
  },

  toolTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#302B3D',
  },

  toolSubtitle: {
    fontSize: 11,
    color: '#9691A2',
    marginTop: 5,
  },

  toolDivider: {
    height: 1,
    backgroundColor: '#F0EDF5',
  },

  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  transactionSubtitle: {
    fontSize: 12,
    color: '#9691A2',
    marginTop: 5,
  },

  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7C4DCE',
  },

  transactionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#F0EDF5',
  },

  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  transactionInfo: {
    flex: 1,
    marginRight: 8,
  },

  transactionName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#302B3D',
  },

  transactionDate: {
    fontSize: 10,
    color: '#9691A2',
    marginTop: 5,
  },

  transactionAmount: {
    fontSize: 12,
    fontWeight: '800',
  },

  transactionDivider: {
    height: 1,
    backgroundColor: '#F2EFF6',
  },

  footerText: {
    textAlign: 'center',
    color: '#A39EAD',
    fontSize: 11,
    marginTop: 24,
  },
});
