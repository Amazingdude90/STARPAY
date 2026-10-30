import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import Header from '../components/Header';
import cardsData from '../data/cards';
import Card from '../components/Card';
import TransferSection from '../components/TransferSection';
import TransactionSection from '../components/TransactionSection';

const HomeScreen = ({
  onTransferContact,
  onSeeAllTransfers,
}) => {
  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsScroll}
          contentContainerStyle={styles.cardsSection}
        >
          {cardsData.slice(0, 3).map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </ScrollView>

        <TransferSection
          onContactPress={onTransferContact}
          onSeeAll={onSeeAllTransfers}
        />

        <TransactionSection />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 30,
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    flexGrow: 1,
  },

  cardsScroll: {
    flexGrow: 0,
    marginTop: 20,
    marginBottom: 12,
  },

  cardsSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 5,
    paddingRight: 20,
  },
});

export default HomeScreen;