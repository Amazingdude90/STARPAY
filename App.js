
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';
import WalletScreen from './src/screens/WalletScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import TransferScreen from './src/screens/TransferScreen';
import BottomNavigation from './src/components/BottomNavigation';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('Home');

  const [selectedTransferContact, setSelectedTransferContact] =
    useState(null);

  const [previousScreen, setPreviousScreen] = useState('Home');

  // Handle bottom navigation
  const handleTabPress = (tabName) => {
    if (tabName === 'Transfer') {
      openTransfer(null, activeScreen);
      return;
    }

    setActiveScreen(tabName);
  };

  // Open the Transfer screen
  const openTransfer = (
    contact = null,
    sourceScreen = activeScreen
  ) => {
    setPreviousScreen(sourceScreen);
    setSelectedTransferContact(contact);
    setActiveScreen('Transfer');
  };

  // Return to the screen that opened Transfer
  const closeTransfer = () => {
    setActiveScreen(previousScreen);
    setSelectedTransferContact(null);
  };

  // Render the active screen
  const renderScreen = () => {
    switch (activeScreen) {
      case 'Home':
        return (
          <HomeScreen
            onTransferContact={(person) =>
              openTransfer(person, 'Home')
            }
            onSeeAllTransfers={() =>
              openTransfer(null, 'Home')
            }
          />
        );

      case 'Statistics':
        return <StatisticsScreen />;

      case 'Wallet':
        return (
          <WalletScreen
            onTransfer={() =>
              openTransfer(null, 'Wallet')
            }
          />
        );

      case 'Transfer':
        return (
          <TransferScreen
            selectedContact={selectedTransferContact}
            onBack={closeTransfer}
          />
        );

      case 'Profile':
        return <ProfileScreen />;

      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.screen}>
        {renderScreen()}
      </View>

      {/* Hide bottom navigation while transferring */}
      {activeScreen !== 'Transfer' && (
        <BottomNavigation
          activeScreen={activeScreen}
          onTabPress={handleTabPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  screen: {
    flex: 1,
  },
});
