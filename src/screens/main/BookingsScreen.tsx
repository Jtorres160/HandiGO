import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface Booking {
  id: string;
  serviceTitle: string;
  provider: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: string;
  location: string;
}

interface BookingsScreenProps {
  navigation: any;
}

const BookingsScreen: React.FC<BookingsScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  // Mock data for bookings
  const bookings: Booking[] = [
    {
      id: '1',
      serviceTitle: 'House Cleaning',
      provider: 'Clean Pro Services',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'upcoming',
      price: '$65',
      location: '123 Main St',
    },
    {
      id: '2',
      serviceTitle: 'Plumbing Repair',
      provider: 'Quick Fix Plumbing',
      date: '2024-01-10',
      time: '2:00 PM',
      status: 'completed',
      price: '$120',
      location: '123 Main St',
    },
    {
      id: '3',
      serviceTitle: 'Math Tutoring',
      provider: 'Tutor Plus',
      date: '2024-01-20',
      time: '4:00 PM',
      status: 'upcoming',
      price: '$40',
      location: '456 Oak Ave',
    },
    {
      id: '4',
      serviceTitle: 'Pet Sitting',
      provider: 'Pet Care Pro',
      date: '2024-01-05',
      time: '9:00 AM',
      status: 'completed',
      price: '$30',
      location: '123 Main St',
    },
  ];

  const filteredBookings = bookings.filter(
    (booking) => booking.status === activeTab
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '#007AFF';
      case 'completed':
        return '#34C759';
      case 'cancelled':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Upcoming';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const handleBookingAction = (booking: Booking, action: string) => {
    Alert.alert(
      action === 'cancel' ? 'Cancel Booking' : 'Booking Details',
      action === 'cancel' 
        ? `Are you sure you want to cancel your ${booking.serviceTitle} booking?`
        : `Service: ${booking.serviceTitle}\nProvider: ${booking.provider}\nDate: ${booking.date}\nTime: ${booking.time}\nPrice: ${booking.price}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: action === 'cancel' ? 'Yes, Cancel' : 'OK',
          onPress: () => {
            if (action === 'cancel') {
              console.log('Booking cancelled:', booking.id);
              Alert.alert('Success', 'Booking cancelled successfully');
            }
          },
        },
      ]
    );
  };

  const renderBookingCard = ({ item }: { item: Booking }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Text style={styles.serviceTitle}>{item.serviceTitle}</Text>
        <Text style={styles.bookingPrice}>{item.price}</Text>
      </View>
      
      <Text style={styles.providerName}>{item.provider}</Text>
      
      <View style={styles.bookingDetails}>
        <Text style={styles.bookingDate}>📅 {item.date}</Text>
        <Text style={styles.bookingTime}>🕐 {item.time}</Text>
      </View>
      
      <Text style={styles.bookingLocation}>📍 {item.location}</Text>
      
      <View style={styles.bookingFooter}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
        
        <View style={styles.actionButtons}>
                  <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Chat', {
            providerName: item.provider,
            serviceTitle: item.serviceTitle,
            bookingDate: item.date,
            bookingTime: item.time,
          })}
        >
          <Text style={styles.actionButtonText}>💬 Chat</Text>
        </TouchableOpacity>
        
        {item.status === 'completed' && (
          <TouchableOpacity
            style={[styles.actionButton, styles.reviewButton]}
            onPress={() => navigation.navigate('Review', { bookingId: item.id })}
          >
            <Text style={styles.reviewButtonText}>⭐ Review</Text>
          </TouchableOpacity>
        )}
        
        {item.status === 'upcoming' && (
          <TouchableOpacity
            style={[styles.actionButton, styles.paymentButton]}
            onPress={() => navigation.navigate('Payment', { bookingId: item.id })}
          >
            <Text style={styles.paymentButtonText}>💳 Pay</Text>
          </TouchableOpacity>
        )}
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleBookingAction(item, 'details')}
          >
            <Text style={styles.actionButtonText}>Details</Text>
          </TouchableOpacity>
          
          {item.status === 'upcoming' && (
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => handleBookingAction(item, 'cancel')}
            >
              <Text style={[styles.actionButtonText, styles.cancelButtonText]}>
                Cancel
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text
            style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text
            style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <View style={styles.bookingsContainer}>
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No {activeTab} bookings found
            </Text>
            <Text style={styles.emptyStateSubtext}>
              {activeTab === 'upcoming' 
                ? 'Book a service to see it here'
                : 'Completed bookings will appear here'
              }
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredBookings}
            renderItem={renderBookingCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.bookingsList}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  bookingsContainer: {
    flex: 1,
    padding: 20,
  },
  bookingsList: {
    paddingBottom: 20,
  },
  bookingCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  providerName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  bookingDetails: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bookingDate: {
    fontSize: 12,
    color: '#666',
    marginRight: 15,
  },
  bookingTime: {
    fontSize: 12,
    color: '#666',
  },
  bookingLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#FFE5E5',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  reviewButton: {
    backgroundColor: '#FFF8E1',
  },
  reviewButtonText: {
    fontSize: 12,
    color: '#FF8F00',
    fontWeight: '500',
  },
  paymentButton: {
    backgroundColor: '#E8F5E8',
  },
  paymentButtonText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  cancelButtonText: {
    color: '#FF3B30',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default BookingsScreen; 