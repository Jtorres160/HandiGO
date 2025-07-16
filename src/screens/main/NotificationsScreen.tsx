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

interface Notification {
  id: string;
  type: 'booking' | 'message' | 'payment' | 'reminder' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  action?: string;
}

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your house cleaning booking for tomorrow at 10 AM has been confirmed by Clean Pro Services.',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      isRead: false,
      action: 'View Booking',
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'Clean Pro Services sent you a message about your upcoming booking.',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: false,
      action: 'Reply',
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Booking Reminder',
      message: 'Don\'t forget! You have a plumbing repair appointment tomorrow at 2 PM.',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isRead: true,
      action: 'View Details',
    },
    {
      id: '4',
      type: 'payment',
      title: 'Payment Successful',
      message: 'Payment of $65 for house cleaning has been processed successfully.',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      isRead: true,
      action: 'View Receipt',
    },
    {
      id: '5',
      type: 'system',
      title: 'App Update',
      message: 'New features available! Update your app to get the latest improvements.',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      isRead: true,
      action: 'Update Now',
    },
    {
      id: '6',
      type: 'booking',
      title: 'Service Completed',
      message: 'Your math tutoring session has been completed. Please leave a review.',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      isRead: true,
      action: 'Leave Review',
    },
  ]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleNotificationAction = (notification: Notification) => {
    markAsRead(notification.id);
    
    switch (notification.type) {
      case 'booking':
        Alert.alert('Booking', 'Navigate to booking details');
        break;
      case 'message':
        Alert.alert('Message', 'Open chat with provider');
        break;
      case 'payment':
        Alert.alert('Payment', 'Show payment receipt');
        break;
      case 'reminder':
        Alert.alert('Reminder', 'Show booking details');
        break;
      case 'system':
        Alert.alert('System', 'Navigate to app store for update');
        break;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return '📅';
      case 'message':
        return '💬';
      case 'payment':
        return '💳';
      case 'reminder':
        return '⏰';
      case 'system':
        return '🔔';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking':
        return '#007AFF';
      case 'message':
        return '#34C759';
      case 'payment':
        return '#FF9500';
      case 'reminder':
        return '#FF3B30';
      case 'system':
        return '#8E8E93';
      default:
        return '#007AFF';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        !item.isRead && styles.unreadNotification,
      ]}
      onPress={() => handleNotificationAction(item)}
    >
      <View style={styles.notificationHeader}>
        <View style={styles.notificationIcon}>
          <Text style={styles.iconText}>{getNotificationIcon(item.type)}</Text>
        </View>
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationTime}>{formatTime(item.timestamp)}</Text>
        </View>
        {!item.isRead && (
          <View style={[styles.unreadDot, { backgroundColor: getNotificationColor(item.type) }]} />
        )}
      </View>
      
      {item.action && (
        <TouchableOpacity
          style={[styles.actionButton, { borderColor: getNotificationColor(item.type) }]}
          onPress={() => handleNotificationAction(item)}
        >
          <Text style={[styles.actionButtonText, { color: getNotificationColor(item.type) }]}>
            {item.action}
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markAllReadText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Unread Count */}
      {unreadCount > 0 && (
        <View style={styles.unreadCountContainer}>
          <Text style={styles.unreadCountText}>
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notificationsList}
      />

      {/* Empty State */}
      {notifications.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>🔔</Text>
          <Text style={styles.emptyStateTitle}>No notifications yet</Text>
          <Text style={styles.emptyStateMessage}>
            You'll see notifications about your bookings, messages, and updates here.
          </Text>
        </View>
      )}
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
  markAllReadText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  unreadCountContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  unreadCountText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  notificationsList: {
    padding: 15,
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginTop: 4,
  },
  actionButton: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
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

export default NotificationsScreen; 