
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  ChevronDown,
} from 'lucide-react-native';

import cardsData from '../data/cards';
import { colors } from '../constants/colors';
import IncomeSpendingCards from '../components/IncomeSpendingCards';
import TransactionSection from '../components/TransactionSection';

const weeklyData = {
  Debit: [
    { day: 'Mon', amount: 40 },
    { day: 'Tue', amount: 65 },
    { day: 'Wed', amount: 45 },
    { day: 'Thu', amount: 90 },
    { day: 'Fri', amount: 58 },
    { day: 'Sat', amount: 72 },
    { day: 'Sun', amount: 50 },
  ],
  Credit: [
    { day: 'Mon', amount: 30 },
    { day: 'Tue', amount: 55 },
    { day: 'Wed', amount: 75 },
    { day: 'Thu', amount: 45 },
    { day: 'Fri', amount: 80 },
    { day: 'Sat', amount: 62 },
    { day: 'Sun', amount: 95 },
  ],
};

const StatisticsScreen = () => {
  const [activeType, setActiveType] = useState('Debit');

  const cardPalette = cardsData
    .map((card) => card.color || card.bgColor)
    .filter(Boolean);

  const chartColors = [
    cardPalette[0] || '#8B5CF6',
    cardPalette[1] || '#C8B5FF',
    cardPalette[2] || '#F3B7A6',
  ];

  const accentColor = colors?.primary || '#8B5CF6';
  const data = weeklyData[activeType];
  const maxAmount = Math.max(...data.map((item) => item.amount));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Page heading: Statistics only */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Statistics</Text>
      </View>

      {/* Debit and Credit selector */}
      <View style={styles.segmentContainer}>
        {['Debit', 'Credit'].map((type) => {
          const isActive = activeType === type;
          const Icon =
            type === 'Debit' ? ArrowUpRight : ArrowDownLeft;

          return (
            <TouchableOpacity
              key={type}
              style={[
                styles.segment,
                isActive && [
                  styles.activeSegment,
                  { backgroundColor: accentColor },
                ],
              ]}
              onPress={() => setActiveType(type)}
              activeOpacity={0.8}
            >
              <Icon
                size={18}
                color={isActive ? '#FFFFFF' : '#888493'}
              />

              <Text
                style={[
                  styles.segmentText,
                  isActive && styles.activeSegmentText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Statistics chart */}
      <View style={styles.chartCard}>
        {/* Amount, increase indicator, and Monthly selector */}
        <View style={styles.chartHeader}>
          <View style={styles.chartAmountContainer}>
            <Text style={styles.chartAmount}>$32,000</Text>

            <View style={styles.increaseContainer}>
              <TrendingUp size={13} color="#16A34A" />

              <Text style={styles.increaseText}>
                2% increase
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.monthSelector}
            activeOpacity={0.7}
            onPress={() => console.log('Select month')}
          >
            <Text style={styles.monthText}>Monthly</Text>
            <ChevronDown size={16} color="#77649D" />
          </TouchableOpacity>
        </View>

        {/* Chart bars */}
        <View style={styles.chart}>
          <View style={styles.gridLines}>
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
          </View>

          <View style={styles.barsContainer}>
            {data.map((item, index) => {
              const barHeight = Math.max(
                8,
                (item.amount / maxAmount) * 145
              );

              const barColor =
                index === 3
                  ? chartColors[0]
                  : chartColors[1];

              return (
                <View key={item.day} style={styles.barColumn}>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: barHeight,
                          backgroundColor: barColor,
                        },
                      ]}
                    />
                  </View>

                  <Text
                    style={[
                      styles.dayLabel,
                      index === 3 && {
                        color: accentColor,
                        fontWeight: '700',
                      },
                    ]}
                  >
                    {item.day}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Chart legend */}
        <View style={styles.chartFooter}>
          <View
            style={[
              styles.legendDot,
              { backgroundColor: chartColors[0] },
            ]}
          />

          <Text style={styles.legendText}>
            {activeType} amount
          </Text>

          <Text style={styles.chartCurrency}>USD ($)</Text>
        </View>
      </View>

      {/* Income and Spending cards */}
      <IncomeSpendingCards />

      {/* Transaction History */}
      <View style={styles.transactionsContainer}>
        <TransactionSection />
      </View>
    </ScrollView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 60,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
  },

  pageHeader: {
    marginBottom: 24,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#252231',
  },

  segmentContainer: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 16,
    backgroundColor: '#EEECF3',
    marginBottom: 18,
  },

  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 12,
  },

  activeSegment: {
    shadowColor: '#5B3E9E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 5,
    elevation: 3,
  },

  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888493',
  },

  activeSegmentText: {
    color: '#FFFFFF',
  },

  chartCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0EDF5',
    shadowColor: '#30234A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.035,
    shadowRadius: 12,
    elevation: 2,
  },

  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  chartAmountContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  chartAmount: {
    fontSize: 25,
    fontWeight: '800',
    color: '#252231',
  },

  increaseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 5,
  },

  increaseText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#16A34A',
  },

  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: '#F3F0FA',
  },

  monthText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#77649D',
  },

  chart: {
    height: 205,
    marginTop: 18,
    position: 'relative',
  },

  gridLines: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    paddingBottom: 28,
    paddingTop: 5,
  },

  gridLine: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#F1EFF5',
    borderStyle: 'dashed',
  },

  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    zIndex: 1,
  },

  barColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  barTrack: {
    height: 165,
    width: '55%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  bar: {
    width: '100%',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    minHeight: 8,
  },

  dayLabel: {
    height: 28,
    paddingTop: 10,
    fontSize: 10,
    color: '#9994A5',
  },

  chartFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 7,
  },

  legendText: {
    fontSize: 11,
    color: '#8D8998',
  },

  chartCurrency: {
    marginLeft: 'auto',
    fontSize: 10,
    color: '#A39EAD',
  },

  transactionsContainer: {
    marginTop: 0,
  },
});
