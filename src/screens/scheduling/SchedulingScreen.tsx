import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

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

interface SchedulingScreenProps {
  navigation: any;
}

const SchedulingScreen: React.FC<SchedulingScreenProps> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>([
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
      date: '2024-01-25',
      time: '9:00 AM',
      status: 'upcoming',
      price: '$30',
      location: '123 Main St',
    },
    {
      id: '5',
      serviceTitle: 'Garden Maintenance',
      provider: 'Green Thumb Services',
      date: '2024-01-05',
      time: '11:00 AM',
      status: 'completed',
      price: '$55',
      location: '789 Pine St',
    },
  ]);

  // Create marked dates for calendar
  const markedDates = useMemo(() => {
    const marked: any = {};
    
    bookings.forEach(booking => {
      const status = booking.status;
      let dotColor = '#007AFF'; // upcoming
      
      if (status === 'completed') {
        dotColor = '#34C759';
      } else if (status === 'cancelled') {
        dotColor = '#FF3B30';
      }
      
      if (marked[booking.date]) {
        // Multiple bookings on same date
        marked[booking.date] = {
          ...marked[booking.date],
          dots: [
            ...marked[booking.date].dots,
            { color: dotColor, key: booking.id }
          ]
        };
      } else {
        marked[booking.date] = {
          dots: [{ color: dotColor, key: booking.id }]
        };
      }
    });
    
    return marked;
  }, [bookings]);

  const getBookingsForDate = (date: string) => {
    return bookings.filter(booking => booking.date === date);
  };

  const handleDateSelect = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const handleBookingAction = (booking: Booking, action: string) => {
    switch (action) {
      case 'cancel':
        Alert.alert(
          'Cancel Booking',
          `Are you sure you want to cancel your ${booking.serviceTitle} booking?`,
          [
            { text: 'No', style: 'cancel' },
            {
              text: 'Yes, Cancel',
              style: 'destructive',
              onPress: () => {
                setBookings(prev =>
                  prev.map(b =>
                    b.id === booking.id ? { ...b, status: 'cancelled' } : b
                  )
                );
                Alert.alert('Success', 'Booking cancelled successfully');
              },
            },
          ]
        );
        break;
      case 'reschedule':
        Alert.alert('Reschedule', 'Reschedule functionality will be implemented soon');
        break;
      case 'chat':
        navigation.navigate('Chat', {
          providerName: booking.provider,
          serviceTitle: booking.serviceTitle,
          bookingDate: booking.date,
          bookingTime: booking.time,
        });
        break;
    }
  };

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

  const renderBookingCard = ({ item }: { item: Booking }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingService}>{item.serviceTitle}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.status) }
        ]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.bookingProvider}>👤 {item.provider}</Text>
      <Text style={styles.bookingTime}>🕐 {item.time}</Text>
      <Text style={styles.bookingLocation}>📍 {item.location}</Text>
      <Text style={styles.bookingPrice}>💰 {item.price}</Text>
      
      {item.status === 'upcoming' && (
        <View style={styles.bookingActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleBookingAction(item, 'chat')}
          >
            <Text style={styles.actionButtonText}>💬 Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleBookingAction(item, 'reschedule')}
          >
            <Text style={styles.actionButtonText}>📅 Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => handleBookingAction(item, 'cancel')}
          >
            <Text style={styles.cancelButtonText}>❌ Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const selectedDateBookings = selectedDate ? getBookingsForDate(selectedDate) : [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Schedule</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.addButtonText}>+ Book Service</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{
            ...markedDates,
            [selectedDate]: {
              ...markedDates[selectedDate],
              selected: true,
              selectedColor: '#007AFF',
            }
          }}
          markingType="multi-dot"
          theme={{
            selectedDayBackgroundColor: '#007AFF',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#007AFF',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#007AFF',
            selectedDotColor: '#ffffff',
            arrowColor: '#007AFF',
            monthTextColor: '#2d4150',
            indicatorColor: '#007AFF',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 13,
          }}
        />
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Legend</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#007AFF' }]} />
            <Text style={styles.legendText}>Upcoming</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#34C759' }]} />
            <Text style={styles.legendText}>Completed</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF3B30' }]} />
            <Text style={styles.legendText}>Cancelled</Text>
          </View>
        </View>
      </View>

      {/* Selected Date Bookings */}
      <View style={styles.bookingsSection}>
        <Text style={styles.sectionTitle}>
          {selectedDate ? `Bookings for ${selectedDate}` : 'Select a date to view bookings'}
        </Text>
        
        {selectedDate && selectedDateBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📅</Text>
            <Text style={styles.emptyStateTitle}>No bookings on this date</Text>
            <Text style={styles.emptyStateMessage}>
              Tap the "+ Book Service" button to schedule a new service.
            </Text>
          </View>
        ) : (
          <FlatList
            data={selectedDateBookings}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  calendarContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  legendContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  bookingsSection: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bookingService: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  bookingProvider: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  bookingTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bookingLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 15,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  cancelButton: {
    backgroundColor: '#FFE5E5',
  },
  cancelButtonText: {
    color: '#FF3B30',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyStateMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SchedulingScreen; 