import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Animated,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import transferContacts from '../data/transferContacts';

const TransferScreen = ({ selectedContact, onBack }) => {
  const [recipient, setRecipient] = useState(selectedContact || null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [page, setPage] = useState('form');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const buttonAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setRecipient(selectedContact || null);
    setAmount('');
    setDescription('');
    setPage('form');
  }, [selectedContact]);

  useEffect(() => {
    fadeAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (page === 'success') {
      scaleAnim.setValue(0.5);

      Animated.spring(scaleAnim, {
        toValue: 1,
        speed: 12,
        bounciness: 7,
        useNativeDriver: true,
      }).start();
    }
  }, [page, fadeAnim, scaleAnim]);

  const formatAmount = (value) => {
    const number = Number(value);

    return number.toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const numericAmount = Number(amount.replace(/,/g, ''));

  const handleReviewTransfer = () => {
    if (!recipient) {
      return;
    }

    if (
      !amount.trim() ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      return;
    }

    setPage('confirm');
  };

  const handleConfirmTransfer = () => {
    // Demo only. Connect a real transfer API before marking
    // a financial transaction as successful.
    setPage('success');
  };

  const handleDone = () => {
    setAmount('');
    setDescription('');
    setPage('form');
    onBack?.();
  };

  const handleBack = () => {
    if (page === 'confirm') {
      setPage('form');
    } else if (page === 'success') {
      handleDone();
    } else {
      onBack?.();
    }
  };

  const animateButton = (callback) => {
    Animated.sequence([
      Animated.timing(buttonAnim, {
        toValue: 0.97,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    callback();
  };

  const Header = ({ title }) => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={23} color="#24202D" />
      </TouchableOpacity>

      <View style={styles.headerText}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          {page === 'form'
            ? 'Send money to your contacts'
            : page === 'confirm'
            ? 'Review your transfer details'
            : 'Your transfer summary'}
        </Text>
      </View>
    </View>
  );

  const PrimaryButton = ({ title, icon, onPress }) => (
    <Animated.View
      style={{ transform: [{ scale: buttonAnim }] }}
    >
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => animateButton(onPress)}
        activeOpacity={0.85}
      >
        {icon ? (
          <Ionicons name={icon} size={19} color="#FFFFFF" />
        ) : null}
        <Text style={styles.primaryButtonText}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Header
          title={
            page === 'form'
              ? 'Transfer Money'
              : page === 'confirm'
              ? 'Confirm Transfer'
              : 'Transfer Complete'
          }
        />

        {/* PAGE 1: Transfer form */}
        {page === 'form' && (
          <Animated.View style={[styles.page, { opacity: fadeAnim }]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.formContent}
            >
              <View style={styles.notice}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={19}
                  color="#7044BE"
                />
                <Text style={styles.noticeText}>
                  Choose a recipient and enter your transfer details.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Choose Recipient</Text>

                <View style={styles.contactsGrid}>
                  {transferContacts.map((person) => {
                    const isSelected = recipient?.id === person.id;

                    return (
                      <TouchableOpacity
                        key={person.id || person.name}
                        style={[
                          styles.personCard,
                          isSelected && styles.selectedPersonCard,
                        ]}
                        onPress={() => setRecipient(person)}
                        activeOpacity={0.75}
                      >
                        <View style={styles.avatarWrapper}>
                          <Image
                            source={person.image}
                            style={styles.avatar}
                            resizeMode="cover"
                          />

                          {isSelected && (
                            <View style={styles.checkBadge}>
                              <Ionicons
                                name="checkmark"
                                size={13}
                                color="#FFFFFF"
                              />
                            </View>
                          )}
                        </View>

                        <Text
                          style={[
                            styles.personName,
                            isSelected && styles.selectedPersonName,
                          ]}
                        >
                          {person.name}
                        </Text>

                        <Text style={styles.personStatus}>
                          {isSelected ? 'Selected' : 'Contact'}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {recipient && (
                <View style={styles.recipientCard}>
                  <Image
                    source={recipient.image}
                    style={styles.recipientAvatar}
                    resizeMode="cover"
                  />

                  <View style={styles.recipientDetails}>
                    <Text style={styles.recipientLabel}>Sending to</Text>
                    <Text style={styles.recipientName}>
                      {recipient.name}
                    </Text>
                  </View>

                  <Ionicons
                    name="checkmark-circle"
                    size={25}
                    color="#7044BE"
                  />
                </View>
              )}

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Enter Amount</Text>

                <View style={styles.amountCard}>
                  <Text style={styles.currencySymbol}>$</Text>

                  <TextInput
                    style={styles.amountInput}
                    value={amount}
                    onChangeText={(value) => {
                      setAmount(value.replace(/[^0-9.]/g, ''));
                    }}
                    placeholder="0.00"
                    placeholderTextColor="#B8B3C2"
                    keyboardType="decimal-pad"
                    maxLength={15}
                  />

                  <Text style={styles.currencyCode}>USD</Text>
                </View>

                <Text style={styles.helperText}>
                  Enter the amount you want to send.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Description
                  <Text style={styles.optional}> (Optional)</Text>
                </Text>

                <View style={styles.descriptionCard}>
                  <Ionicons
                    name="document-text-outline"
                    size={21}
                    color="#8C849B"
                  />

                  <TextInput
                    style={styles.descriptionInput}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="What is this transfer for?"
                    placeholderTextColor="#A7A1B2"
                    maxLength={100}
                  />
                </View>
              </View>

              <PrimaryButton
                title="Review Transfer"
                icon="paper-plane-outline"
                onPress={handleReviewTransfer}
              />

              {(!recipient ||
                !amount.trim() ||
                !Number.isFinite(numericAmount) ||
                numericAmount <= 0) && (
                <Text style={styles.helperText}>
                  {!recipient
                    ? 'Select a recipient to continue.'
                    : 'Enter a valid amount to continue.'}
                </Text>
              )}

              <View style={styles.securityNote}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={17}
                  color="#8B8497"
                />
                <Text style={styles.securityText}>
                  Review the recipient and amount before confirming.
                </Text>
              </View>
            </ScrollView>
          </Animated.View>
        )}

        {/* PAGE 2: Confirmation page */}
        {page === 'confirm' && (
          <Animated.View
            style={[styles.page, styles.flowPage, { opacity: fadeAnim }]}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flowContent}
            >
              <View style={styles.confirmIcon}>
                <Ionicons
                  name="help-circle-outline"
                  size={42}
                  color="#7044BE"
                />
              </View>

              <Text style={styles.flowTitle}>
                Are you sure you want to make this transfer?
              </Text>

              <Text style={styles.flowSubtitle}>
                Please check the details below before you continue.
              </Text>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Transfer amount</Text>

                <Text style={styles.summaryAmount}>
                  ${formatAmount(numericAmount)}
                </Text>

                <View style={styles.divider} />

                <View style={styles.summaryRecipient}>
                  <Image
                    source={recipient.image}
                    style={styles.summaryAvatar}
                  />

                  <View style={styles.summaryRecipientDetails}>
                    <Text style={styles.summaryLabel}>Recipient</Text>
                    <Text style={styles.summaryValue}>
                      {recipient.name}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.summaryLabel}>Description</Text>
                  <Text style={styles.summaryValue}>
                    {description.trim() || 'Money transfer'}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.summaryLabel}>Currency</Text>
                  <Text style={styles.summaryValue}>USD ($)</Text>
                </View>
              </View>

              <View style={styles.warningNote}>
                <Ionicons
                  name="information-circle-outline"
                  size={19}
                  color="#7044BE"
                />
                <Text style={styles.warningText}>
                  This is a demo transfer. No real money will be moved.
                </Text>
              </View>
            </ScrollView>

            <View style={styles.bottomActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setPage('form')}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>No, Go Back</Text>
              </TouchableOpacity>

              <PrimaryButton
                title="Yes, Confirm Transfer"
                icon="checkmark-circle-outline"
                onPress={handleConfirmTransfer}
              />
            </View>
          </Animated.View>
        )}

        {/* PAGE 3: Success page */}
        {page === 'success' && (
          <Animated.View
            style={[styles.page, styles.successPage, { opacity: fadeAnim }]}
          >
            <View style={styles.successContent}>
              <Animated.View
                style={[
                  styles.successIconOuter,
                  { transform: [{ scale: scaleAnim }] },
                ]}
              >
                <View style={styles.successIconInner}>
                  <Ionicons
                    name="checkmark"
                    size={57}
                    color="#FFFFFF"
                  />
                </View>
              </Animated.View>

              <Text style={styles.successTitle}>
                Transfer Successful!
              </Text>

              <Text style={styles.successSubtitle}>
                Your demo transfer confirmation is complete.
              </Text>

              <Text style={styles.successAmount}>
                ${formatAmount(numericAmount)}
              </Text>

              <Text style={styles.sentToLabel}>Sent to</Text>

              <View style={styles.successRecipient}>
                <Image
                  source={recipient.image}
                  style={styles.successAvatar}
                />

                <View>
                  <Text style={styles.successRecipientName}>
                    {recipient.name}
                  </Text>
                  <Text style={styles.successDescription}>
                    {description.trim() || 'Money transfer'}
                  </Text>
                </View>
              </View>

              <View style={styles.successSummary}>
                <View style={styles.detailRow}>
                  <Text style={styles.summaryLabel}>Amount</Text>
                  <Text style={styles.summaryValue}>
                    ${formatAmount(numericAmount)}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.summaryLabel}>Recipient</Text>
                  <Text style={styles.summaryValue}>
                    {recipient.name}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.summaryLabel}>Status</Text>
                  <View style={styles.statusBadge}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>Demo confirmed</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.doneButtonContainer}>
              <PrimaryButton
                title="Done"
                icon="checkmark-circle-outline"
                onPress={handleDone}
              />
            </View>
          </Animated.View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F7FB',
  },

  screen: {
    flex: 1,
    backgroundColor: '#F8F7FB',
    paddingTop: Platform.OS === 'android' ? 4 : 0,
  },

  page: {
    flex: 1,
    minHeight: 0,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 15,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEEAF4',
  },

  headerText: {
    marginLeft: 13,
    flex: 1,
  },

  title: {
    fontSize: 21,
    fontWeight: '800',
    color: '#24202D',
  },

  subtitle: {
    fontSize: 12,
    color: '#898394',
    marginTop: 4,
  },

  formContent: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 30,
  },

  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0E9FC',
    padding: 13,
    borderRadius: 14,
    marginBottom: 23,
    gap: 9,
  },

  noticeText: {
    flex: 1,
    color: '#63409C',
    fontSize: 12,
    fontWeight: '500',
  },

  section: {
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#292532',
    marginBottom: 13,
  },

  contactsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  personCard: {
    width: '48%',
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEAF4',
    borderRadius: 18,
  },

  selectedPersonCard: {
    borderColor: '#7044BE',
    backgroundColor: '#F5F0FE',
  },

  avatarWrapper: {
    position: 'relative',
    marginBottom: 9,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EAE5F2',
  },

  checkBadge: {
    position: 'absolute',
    right: -2,
    bottom: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#7044BE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  personName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#363140',
  },

  selectedPersonName: {
    color: '#7044BE',
  },

  personStatus: {
    marginTop: 4,
    fontSize: 11,
    color: '#9690A1',
  },

  recipientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEAF4',
    marginBottom: 22,
  },

  recipientAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#EAE5F2',
  },

  recipientDetails: {
    flex: 1,
    marginLeft: 12,
  },

  recipientLabel: {
    fontSize: 12,
    color: '#928B9F',
    marginBottom: 4,
  },

  recipientName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#292532',
  },

  amountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 68,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAE5F2',
    borderRadius: 17,
  },

  currencySymbol: {
    fontSize: 26,
    fontWeight: '700',
    color: '#7044BE',
    marginRight: 8,
  },

  amountInput: {
    flex: 1,
    fontSize: 25,
    fontWeight: '700',
    color: '#292532',
    paddingVertical: 8,
  },

  currencyCode: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8D869A',
  },

  helperText: {
    marginTop: 8,
    fontSize: 11,
    color: '#9690A1',
  },

  optional: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9690A1',
  },

  descriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 55,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAE5F2',
    borderRadius: 15,
  },

  descriptionInput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 12,
    fontSize: 13,
    color: '#292532',
  },

  primaryButton: {
    minHeight: 53,
    borderRadius: 16,
    backgroundColor: '#7044BE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    paddingHorizontal: 14,
    elevation: 3,
    shadowColor: '#7044BE',
    shadowOpacity: 0.18,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 16,
  },

  securityText: {
    fontSize: 11,
    color: '#8B8497',
    flexShrink: 1,
  },

  flowPage: {
    paddingHorizontal: 20,
  },

  flowContent: {
    flexGrow: 1,
    paddingTop: 18,
    paddingBottom: 20,
  },

  confirmIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#F0E9FC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 17,
  },

  flowTitle: {
    fontSize: 23,
    lineHeight: 30,
    fontWeight: '800',
    color: '#24202D',
    textAlign: 'center',
  },

  flowSubtitle: {
    fontSize: 12,
    lineHeight: 19,
    color: '#898394',
    textAlign: 'center',
    marginTop: 9,
    marginBottom: 23,
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EEEAF4',
    padding: 18,
  },

  summaryLabel: {
    fontSize: 11,
    color: '#928B9F',
  },

  summaryAmount: {
    fontSize: 29,
    fontWeight: '800',
    color: '#292532',
    marginTop: 7,
    marginBottom: 17,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEAF4',
    marginBottom: 16,
  },

  summaryRecipient: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 19,
  },

  summaryAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    marginRight: 12,
  },

  summaryRecipientDetails: {
    flex: 1,
    gap: 5,
  },

  summaryValue: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#292532',
    textAlign: 'right',
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginTop: 14,
  },

  warningNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0E9FC',
    padding: 13,
    borderRadius: 13,
    marginTop: 16,
  },

  warningText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 17,
    color: '#63409C',
  },

  bottomActions: {
    paddingTop: 10,
    paddingBottom: 15,
    gap: 11,
  },

  cancelButton: {
    minHeight: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E4DDEC',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#292532',
  },

  successPage: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },

  successContent: {
    alignItems: 'center',
  },

  successIconOuter: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#E5F8EF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 23,
  },

  successIconInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#25B982',
    alignItems: 'center',
    justifyContent: 'center',
  },

  successTitle: {
    fontSize: 23,
    fontWeight: '800',
    color: '#24202D',
    textAlign: 'center',
  },

  successSubtitle: {
    fontSize: 12,
    color: '#898394',
    textAlign: 'center',
    marginTop: 8,
  },

  successAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#292532',
    marginTop: 22,
  },

  sentToLabel: {
    fontSize: 11,
    color: '#928B9F',
    marginTop: 6,
    marginBottom: 13,
  },

  successRecipient: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 23,
  },

  successAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    marginRight: 12,
  },

  successRecipientName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#292532',
  },

  successDescription: {
    fontSize: 11,
    color: '#928B9F',
    marginTop: 4,
  },

  successSummary: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEAF4',
    borderRadius: 17,
    padding: 16,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#E5F8EF',
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#25B982',
  },

  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#16845D',
  },

  doneButtonContainer: {
    paddingTop: 15,
  },
});

export default TransferScreen;
