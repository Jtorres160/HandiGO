import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

interface ProviderService {
  id: string;
  title: string;
  category: string;
  price: string;
  status: 'active' | 'inactive';
  bookings: number;
  rating: number;
}

interface ProviderBooking {
  id: string;
  serviceTitle: string;
  customerName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: string;
  location: string;
}

const ProviderDashboardScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'bookings'>('overview');

  // Mock provider data
  const providerStats = {
    totalEarnings: '$2,450',
    thisMonth: '$680',
    totalBookings: 24,
    activeServices: 5,
    averageRating: 4.8,
  };

  const services: ProviderService[] = [
    {
      id: '1',
      title: 'House Cleaning',
      category: 'Cleaning',
      price: '$50-80',
      status: 'active',
      bookings: 12,
      rating: 4.8,
    },
    {
      id: '2',
      title: 'Deep Carpet Cleaning',
      category: 'Cleaning',
      price: '$100-150',
      status: 'active',
      bookings: 8,
      rating: 4.9,
    },
    {
      id: '3',
      title: 'Window Cleaning',
      category: 'Cleaning',
      price: '$30-50',
      status: 'inactive',
      bookings: 4,
      rating: 4.7,
    },
  ];

  const bookings: ProviderBooking[] = [
    {
      id: '1',
      serviceTitle: 'House Cleaning',
      customerName: 'Sarah Johnson',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed',
      price: '$65',
      location: '123 Main St',
    },
    {
      id: '2',
      serviceTitle: 'Deep Carpet Cleaning',
      customerName: 'Mike Wilson',
      date: '2024-01-16',
      time: '2:00 PM',
      status: 'pending',
      price: '$120',
      location: '456 Oak Ave',
    },
    {
      id: '3',
      serviceTitle: 'House Cleaning',
      customerName: 'Lisa Brown',
      date: '2024-01-14',
      time: '9:00 AM',
      status: 'completed',
      price: '$70',
      location: '789 Pine St',
    },
  ];

  const renderServiceCard = ({ item }: { item: ProviderService }) => (
    <View style={styles.serviceCard}>
      <View style={styles.serviceCardHeader}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <View style={[
          styles.statusBadge,
          item.status === 'active' ? styles.activeBadge : styles.inactiveBadge
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.serviceCategory}>{item.category}</Text>
      <Text style={styles.servicePrice}>{item.price}</Text>
      <View style={styles.serviceStats}>
        <Text style={styles.serviceStat}>📅 {item.bookings} bookings</Text>
        <Text style={styles.serviceStat}>⭐ {item.rating}</Text>
      </View>
      <View style={styles.serviceActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Bookings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderBookingCard = ({ item }: { item: ProviderBooking }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingCardHeader}>
        <Text style={styles.bookingService}>{item.serviceTitle}</Text>
        <View style={[
          styles.statusBadge,
          item.status === 'confirmed' ? styles.confirmedBadge :
          item.status === 'pending' ? styles.pendingBadge :
          item.status === 'completed' ? styles.completedBadge :
          styles.cancelledBadge
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.bookingCustomer}>👤 {item.customerName}</Text>
      <Text style={styles.bookingDateTime}>📅 {item.date} at {item.time}</Text>
      <Text style={styles.bookingLocation}>📍 {item.location}</Text>
      <Text style={styles.bookingPrice}>{item.price}</Text>
      <View style={styles.bookingActions}>
        {item.status === 'pending' && (
          <>
            <TouchableOpacity style={[styles.actionButton, styles.confirmButton]}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.declineButton]}>
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>
          </>
        )}
        {item.status === 'confirmed' && (
          <TouchableOpacity style={[styles.actionButton, styles.completeButton]}>
            <Text style={styles.completeButtonText}>Mark Complete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderOverview = () => (
    <ScrollView style={styles.overviewContainer}>
      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{providerStats.totalEarnings}</Text>
          <Text style={styles.statLabel}>Total Earnings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{providerStats.thisMonth}</Text>
          <Text style={styles.statLabel}>This Month</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{providerStats.totalBookings}</Text>
          <Text style={styles.statLabel}>Total Bookings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{providerStats.activeServices}</Text>
          <Text style={styles.statLabel}>Active Services</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionText}>➕ Add New Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionText}>📊 View Analytics</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity */}
      <View style={styles.recentActivity}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>New booking received for House Cleaning</Text>
          <Text style={styles.activityTime}>2 hours ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>Payment received: $65</Text>
          <Text style={styles.activityTime}>1 day ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>New 5-star review received</Text>
          <Text style={styles.activityTime}>2 days ago</Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Provider Dashboard</Text>
        <Text style={styles.headerSubtitle}>Manage your services and bookings</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'services' && styles.activeTab]}
          onPress={() => setActiveTab('services')}
        >
          <Text style={[styles.tabText, activeTab === 'services' && styles.activeTabText]}>
            Services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'bookings' && styles.activeTab]}
          onPress={() => setActiveTab('bookings')}
        >
          <Text style={[styles.tabText, activeTab === 'bookings' && styles.activeTabText]}>
            Bookings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'services' && (
          <FlatList
            data={services}
            renderItem={renderServiceCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.servicesList}
          />
        )}
        {activeTab === 'bookings' && (
          <FlatList
            data={bookings}
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
    padding: 20,
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  overviewContainer: {
    flex: 1,
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  recentActivity: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
  servicesList: {
    padding: 20,
  },
  serviceCard: {
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
  serviceCardHeader: {
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
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: '#34C759',
  },
  inactiveBadge: {
    backgroundColor: '#FF9500',
  },
  confirmedBadge: {
    backgroundColor: '#007AFF',
  },
  pendingBadge: {
    backgroundColor: '#FF9500',
  },
  completedBadge: {
    backgroundColor: '#34C759',
  },
  cancelledBadge: {
    backgroundColor: '#FF3B30',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    textTransform: 'uppercase',
  },
  serviceCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 10,
  },
  serviceStats: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  serviceStat: {
    fontSize: 12,
    color: '#666',
  },
  serviceActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  bookingsList: {
    padding: 20,
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
  bookingCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bookingService: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bookingCustomer: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  bookingDateTime: {
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
  confirmButton: {
    backgroundColor: '#34C759',
  },
  confirmButtonText: {
    color: 'white',
  },
  declineButton: {
    backgroundColor: '#FF3B30',
  },
  declineButtonText: {
    color: 'white',
  },
  completeButton: {
    backgroundColor: '#007AFF',
  },
  completeButtonText: {
    color: 'white',
  },
});

export default ProviderDashboardScreen; 