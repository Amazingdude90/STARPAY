
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';

import {
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  ShieldCheck,
  Bell,
  LockKeyhole,
  Globe,
  CircleHelp,
  Headphones,
  ChevronRight,
  Pencil,
  LogOut,
  CreditCard,
  Settings,
  FileText,
  Camera,
} from 'lucide-react-native';

const ProfileScreen = () => {
  const handleAction = (action) => {
    if (action === 'Logout') {
      Alert.alert(
        'Log out',
        'Are you sure you want to log out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Log out',
            style: 'destructive',
            onPress: () =>
              Alert.alert(
                'Logout',
                'Connect this action to your authentication system.'
              ),
          },
        ]
      );
      return;
    }

    Alert.alert(
      action,
      `${action} will be available when this feature is connected.`
    );
  };

  const personalInformation = [
    {
      id: 'email',
      label: 'Email Address',
      value: 'nicolas.smith@email.com',
      icon: Mail,
    },
    {
      id: 'phone',
      label: 'Phone Number',
      value: '+1 (555) 123-4567',
      icon: Phone,
    },
    {
      id: 'birthday',
      label: 'Date of Birth',
      value: '15 August 1998',
      icon: CalendarDays,
    },
    {
      id: 'address',
      label: 'Address',
      value: 'New York, United States',
      icon: MapPin,
    },
  ];

  const accountInformation = [
    {
      id: 'account',
      label: 'Account Information',
      subtitle: 'View your account details',
      icon: UserRound,
      color: '#7044BE',
      background: '#F0EAFE',
    },
    {
      id: 'cards',
      label: 'My Cards',
      subtitle: 'Manage your linked cards',
      icon: CreditCard,
      color: '#0D9488',
      background: '#E3F8F5',
    },
    {
      id: 'documents',
      label: 'Statements & Documents',
      subtitle: 'Access your financial documents',
      icon: FileText,
      color: '#D97706',
      background: '#FFF3DF',
    },
  ];

  const settingsItems = [
    {
      id: 'security',
      label: 'Security & Password',
      subtitle: 'Password and account protection',
      icon: LockKeyhole,
      color: '#7044BE',
      background: '#F0EAFE',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      subtitle: 'Manage your alerts',
      icon: Bell,
      color: '#D97706',
      background: '#FFF3DF',
    },
    {
      id: 'privacy',
      label: 'Privacy Settings',
      subtitle: 'Control your personal information',
      icon: ShieldCheck,
      color: '#0D9488',
      background: '#E3F8F5',
    },
    {
      id: 'preferences',
      label: 'Preferences',
      subtitle: 'Language and app preferences',
      icon: Globe,
      color: '#DB2777',
      background: '#FCE7F3',
    },
  ];

  const supportItems = [
    {
      id: 'help',
      label: 'Help Center',
      subtitle: 'Find answers to common questions',
      icon: CircleHelp,
      color: '#7044BE',
      background: '#F0EAFE',
    },
    {
      id: 'support',
      label: 'Contact Support',
      subtitle: 'We are here to help',
      icon: Headphones,
      color: '#0D9488',
      background: '#E3F8F5',
    },
  ];

  const renderMenuSection = (title, items) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.menuCard}>
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.menuRow}
                activeOpacity={0.7}
                onPress={() => handleAction(item.label)}
              >
                <View
                  style={[
                    styles.menuIcon,
                    {
                      backgroundColor: item.background,
                    },
                  ]}
                >
                  <Icon size={20} color={item.color} />
                </View>

                <View style={styles.menuText}>
                  <Text style={styles.menuLabel}>
                    {item.label}
                  </Text>

                  <Text style={styles.menuSubtitle}>
                    {item.subtitle}
                  </Text>
                </View>

                <ChevronRight size={19} color="#A09AAA" />
              </TouchableOpacity>

              {index < items.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );

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
        {/* Page heading */}
        <View style={styles.pageHeader}>
          <View>
            <Text style={styles.pageTitle}>My Profile</Text>

            <Text style={styles.pageSubtitle}>
              Manage your personal information
            </Text>
          </View>

          <TouchableOpacity
            style={styles.settingsButton}
            activeOpacity={0.7}
            onPress={() => handleAction('Settings')}
          >
            <Settings size={21} color="#292536" />
          </TouchableOpacity>
        </View>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require('../../assets/images/avatar.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />

              <TouchableOpacity
                style={styles.cameraButton}
                activeOpacity={0.7}
                onPress={() => handleAction('Change Profile Photo')}
              >
                <Camera size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileIdentity}>
              <Text style={styles.customerName}>
                Nicolas Smith
              </Text>

              <Text style={styles.customerEmail}>
                nicolas.smith@email.com
              </Text>

              <View style={styles.verifiedBadge}>
                <ShieldCheck size={13} color="#16A34A" />

                <Text style={styles.verifiedText}>
                  Verified Account
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.profileDivider} />

          <TouchableOpacity
            style={styles.editProfileButton}
            activeOpacity={0.8}
            onPress={() => handleAction('Edit Profile')}
          >
            <Pencil size={16} color="#FFFFFF" />

            <Text style={styles.editProfileText}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Account summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <View style={styles.summaryIcon}>
              <UserRound size={19} color="#7044BE" />
            </View>

            <Text style={styles.summaryLabel}>
              Account Type
            </Text>

            <Text style={styles.summaryValue}>
              Personal
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <View
              style={[
                styles.summaryIcon,
                { backgroundColor: '#E3F8F5' },
              ]}
            >
              <ShieldCheck size={19} color="#0D9488" />
            </View>

            <Text style={styles.summaryLabel}>
              Verification
            </Text>

            <Text
              style={[
                styles.summaryValue,
                { color: '#16A34A' },
              ]}
            >
              Verified
            </Text>
          </View>
        </View>

        {/* Personal information */}
        <View style={styles.section}>
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>
              Personal Information
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleAction('Edit Personal Information')}
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.personalInfoCard}>
            {personalInformation.map((item, index) => {
              const Icon = item.icon;

              return (
                <View key={item.id}>
                  <View style={styles.personalInfoRow}>
                    <View style={styles.personalInfoIcon}>
                      <Icon size={19} color="#817A91" />
                    </View>

                    <View style={styles.personalInfoText}>
                      <Text style={styles.personalInfoLabel}>
                        {item.label}
                      </Text>

                      <Text style={styles.personalInfoValue}>
                        {item.value}
                      </Text>
                    </View>
                  </View>

                  {index < personalInformation.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Account menu */}
        {renderMenuSection(
          'Account',
          accountInformation
        )}

        {/* Security and preferences */}
        {renderMenuSection(
          'Security & Preferences',
          settingsItems
        )}

        {/* Help and support */}
        {renderMenuSection(
          'Help & Support',
          supportItems
        )}

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.75}
          onPress={() => handleAction('Logout')}
        >
          <LogOut size={19} color="#E5485D" />

          <Text style={styles.logoutText}>
            Log Out
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Your money, your information, your control.
        </Text>

        <Text style={styles.versionText}>
          Wallet App · Version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

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

  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#292536',
  },

  pageSubtitle: {
    fontSize: 12,
    color: '#9691A2',
    marginTop: 6,
  },

  settingsButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFECF4',
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#F0EDF5',
    marginBottom: 18,
    shadowColor: '#30234A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.035,
    shadowRadius: 12,
    elevation: 2,
  },

  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImageContainer: {
    position: 'relative',
    marginRight: 15,
  },

  profileImage: {
    width: 86,
    height: 86,
    borderRadius: 25,
    backgroundColor: '#E8DDFB',
    borderWidth: 2,
    borderColor: '#F0EAFE',
  },

  cameraButton: {
    position: 'absolute',
    right: -5,
    bottom: -4,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#7044BE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  profileIdentity: {
    flex: 1,
  },

  customerName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#292536',
    marginBottom: 5,
  },

  customerEmail: {
    fontSize: 11,
    color: '#8E899B',
    marginBottom: 9,
  },

  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    backgroundColor: '#E9F9EF',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },

  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },

  profileDivider: {
    height: 1,
    backgroundColor: '#F0EDF5',
    marginTop: 22,
    marginBottom: 16,
  },

  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#7044BE',
    paddingVertical: 13,
    borderRadius: 13,
  },

  editProfileText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#F0EDF5',
    paddingVertical: 18,
    paddingHorizontal: 10,
    marginBottom: 29,
  },

  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },

  summaryIcon: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: '#F0EAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
  },

  summaryLabel: {
    fontSize: 10,
    color: '#9691A2',
    marginBottom: 5,
  },

  summaryValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#302B3D',
  },

  summaryDivider: {
    width: 1,
    backgroundColor: '#F0EDF5',
    marginHorizontal: 8,
  },

  section: {
    marginBottom: 28,
  },

  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#292536',
  },

  editText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7C4DCE',
  },

  personalInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#F0EDF5',
  },

  personalInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  personalInfoIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#F6F4FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  personalInfoText: {
    flex: 1,
  },

  personalInfoLabel: {
    fontSize: 11,
    color: '#9691A2',
    marginBottom: 5,
  },

  personalInfoValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#302B3D',
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#F0EDF5',
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  menuIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  menuText: {
    flex: 1,
    marginRight: 8,
  },

  menuLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#302B3D',
  },

  menuSubtitle: {
    fontSize: 10,
    color: '#9691A2',
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: '#F0EDF5',
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    backgroundColor: '#FFF0F2',
    borderRadius: 15,
    marginBottom: 22,
  },

  logoutText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#E5485D',
  },

  footerText: {
    textAlign: 'center',
    color: '#8E899B',
    fontSize: 11,
    marginBottom: 8,
  },

  versionText: {
    textAlign: 'center',
    color: '#B0AABA',
    fontSize: 10,
  },
});
