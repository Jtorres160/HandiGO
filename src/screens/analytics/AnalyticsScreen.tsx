import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';

interface AnalyticsData {
  totalSpent: number;
  totalBookings: number;
  averageRating: number;
  favoriteService: string;
  mostUsedProvider: string;
  monthlySpending: number[];
  serviceBreakdown: ServiceBreakdown[];
  recentActivity: ActivityItem[];
}

interface ServiceBreakdown {
  service: string;
  count: number;
  totalSpent: number;
  percentage: number;
}

interface ActivityItem {
  id: string;
  type: 'booking' | 'payment' | 'review' | 'favorite';
  title: string;
  description: string;
  date: string;
  amount?: number;
}

interface AnalyticsScreenProps {
  navigation: any;
}

const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ navigation }) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    totalSpent: 1245.50,
    totalBookings: 18,
    averageRating: 4.7,
    favoriteService: 'House Cleaning',
    mostUsedProvider: 'Clean Pro Services',
    monthlySpending: [320, 450, 380, 420, 380, 410, 380, 420, 450, 380, 420, 480],
    serviceBreakdown: [
      { service: 'House Cleaning', count: 8, totalSpent: 520, percentage: 42 },
      { service: 'Plumbing Repair', count: 3, totalSpent: 360, percentage: 29 },
      { service: 'Pet Sitting', count: 4, totalSpent: 140, percentage: 11 },
      { service: 'Tutoring', count: 2, totalSpent: 160, percentage: 13 },
      { service: 'Garden Maintenance', count: 1, totalSpent: 65, percentage: 5 },
    ],
    recentActivity: [
      {
        id: '1',
        type: 'booking',
        title: 'Booked House Cleaning',
        description: 'Clean Pro Services - $65',
        date: '2024-01-15',
        amount: 65,
      },
      {
        id: '2',
        type: 'review',
        title: 'Left a Review',
        description: '5 stars for Quick Fix Plumbing',
        date: '2024-01-10',
      },
      {
        id: '3',
        type: 'payment',
        title: 'Payment Processed',
        description: 'Plumbing repair - $120',
        date: '2024-01-10',
        amount: 120,
      },
      {
        id: '4',
        type: 'favorite',
        title: 'Added to Favorites',
        description: 'Pet Care Pro',
        date: '2024-01-08',
      },
    ],
  };

  const getTimeRangeText = () => {
    switch (timeRange) {
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      case 'year':
        return 'This Year';
      default:
        return 'This Month';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return '📅';
      case 'payment':
        return '💳';
      case 'review':
        return '⭐';
      case 'favorite':
        return '❤️';
      default:
        return '📊';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'booking':
        return '#007AFF';
      case 'payment':
        return '#34C759';
      case 'review':
        return '#FFD700';
      case 'favorite':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const renderStatCard = (title: string, value: string | number, subtitle?: string, icon?: string) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        {icon && <Text style={styles.statIcon}>{icon}</Text>}
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  const renderServiceBreakdownItem = (item: ServiceBreakdown) => (
    <View key={item.service} style={styles.breakdownItem}>
      <View style={styles.breakdownHeader}>
        <Text style={styles.breakdownService}>{item.service}</Text>
        <Text style={styles.breakdownPercentage}>{item.percentage}%</Text>
      </View>
      <View style={styles.breakdownBar}>
        <View 
          style={[
            styles.breakdownBarFill, 
            { width: `${item.percentage}%` }
          ]} 
        />
      </View>
      <View style={styles.breakdownDetails}>
        <Text style={styles.breakdownCount}>{item.count} bookings</Text>
        <Text style={styles.breakdownAmount}>${item.totalSpent}</Text>
      </View>
    </View>
  );

  const renderActivityItem = (item: ActivityItem) => (
    <View key={item.id} style={styles.activityItem}>
      <View style={[
        styles.activityIcon,
        { backgroundColor: getActivityColor(item.type) }
      ]}>
        <Text style={styles.activityIconText}>{getActivityIcon(item.type)}</Text>
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityItemTitle}>{item.title}</Text>
        <Text style={styles.activityDescription}>{item.description}</Text>
        <Text style={styles.activityDate}>{formatDate(item.date)}</Text>
      </View>
      {item.amount && (
        <Text style={styles.activityAmount}>${item.amount}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analytics</Text>
          <TouchableOpacity 
            style={styles.exportButton}
            onPress={() => Alert.alert('Export', 'Export functionality will be implemented soon')}
          >
            <Text style={styles.exportButtonText}>📊 Export</Text>
          </TouchableOpacity>
        </View>

        {/* Time Range Selector */}
        <View style={styles.timeRangeContainer}>
          <Text style={styles.timeRangeTitle}>{getTimeRangeText()}</Text>
          <View style={styles.timeRangeButtons}>
            {(['week', 'month', 'year'] as const).map((range) => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.timeRangeButton,
                  timeRange === range && styles.activeTimeRangeButton,
                ]}
                onPress={() => setTimeRange(range)}
              >
                <Text style={[
                  styles.timeRangeButtonText,
                  timeRange === range && styles.activeTimeRangeButtonText,
                ]}>
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Key Stats */}
        <View style={styles.statsGrid}>
          {renderStatCard('Total Spent', `$${analyticsData.totalSpent}`, 'All time', '💰')}
          {renderStatCard('Total Bookings', analyticsData.totalBookings, 'Services booked', '📅')}
          {renderStatCard('Average Rating', analyticsData.averageRating, 'Your reviews', '⭐')}
          {renderStatCard('Favorite Service', analyticsData.favoriteService, 'Most used', '🏆')}
        </View>

        {/* Spending Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Monthly Spending Trend</Text>
          <View style={styles.chart}>
            {analyticsData.monthlySpending.map((amount, index) => (
              <View key={index} style={styles.chartBar}>
                <View 
                  style={[
                    styles.chartBarFill, 
                    { height: `${(amount / 500) * 100}%` }
                  ]} 
                />
                <Text style={styles.chartBarLabel}>${amount}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.chartSubtitle}>Last 12 months</Text>
        </View>

        {/* Service Breakdown */}
        <View style={styles.breakdownContainer}>
          <Text style={styles.breakdownTitle}>Service Breakdown</Text>
          {analyticsData.serviceBreakdown.map(renderServiceBreakdownItem)}
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.activityTitle}>Recent Activity</Text>
          {analyticsData.recentActivity.map(renderActivityItem)}
        </View>

        {/* Insights */}
        <View style={styles.insightsContainer}>
          <Text style={styles.insightsTitle}>💡 Insights</Text>
          <View style={styles.insightItem}>
            <Text style={styles.insightIcon}>📈</Text>
            <Text style={styles.insightText}>
              You've spent 15% more this month compared to last month
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightIcon}>🎯</Text>
            <Text style={styles.insightText}>
              House cleaning is your most frequent service (8 bookings)
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightIcon}>⭐</Text>
            <Text style={styles.insightText}>
              Your average rating of 4.7 is above the platform average
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
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
  exportButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  exportButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  timeRangeContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timeRangeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  timeRangeButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  timeRangeButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTimeRangeButton: {
    backgroundColor: '#007AFF',
  },
  timeRangeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activeTimeRangeButtonText: {
    color: 'white',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 15,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    width: (Dimensions.get('window').width - 70) / 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  chartContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  chart: {
    flexDirection: 'row',
    height: 150,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  chartBarFill: {
    backgroundColor: '#007AFF',
    width: 20,
    borderRadius: 10,
    marginBottom: 5,
  },
  chartBarLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  breakdownContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  breakdownItem: {
    marginBottom: 15,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  breakdownService: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  breakdownPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  breakdownBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 8,
  },
  breakdownBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  breakdownDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdownCount: {
    fontSize: 12,
    color: '#666',
  },
  breakdownAmount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  activityContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityIconText: {
    fontSize: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 10,
    color: '#999',
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  insightsContainer: {
    backgroundColor: '#f0f8ff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 15,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  insightIcon: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 2,
  },
  insightText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
});

export default AnalyticsScreen; 