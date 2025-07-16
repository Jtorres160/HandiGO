import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AuthStorage, SecurityUtils } from '../../utils/secureStorage';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    memberSince: 'January 2024',
    totalBookings: 12,
    averageRating: 4.8,
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              // 🔐 SECURE: Clear all sensitive data
              await SecurityUtils.clearAllSensitiveData();
              
              console.log('User logged out - all sensitive data cleared');
              
              // Navigate back to login
              navigation.navigate('Login');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout properly');
            }
          },
        },
      ]
    );
  };

  const handleCheckAuthStatus = async () => {
    try {
      const authToken = await AuthStorage.getAuthToken();
      const refreshToken = await AuthStorage.getRefreshToken();
      
      if (authToken) {
        Alert.alert(
          'Auth Status',
          '✅ Authentication tokens found\n\n' +
          'Auth Token: ' + authToken.substring(0, 20) + '...\n' +
          'Refresh Token: ' + (refreshToken ? 'Present' : 'Missing')
        );
      } else {
        Alert.alert('Auth Status', '❌ No authentication tokens found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to check auth status');
    }
  };

  const menuItems = [
    {
      id: '1',
      icon: '👤',
      title: 'Edit Profile',
      action: () => Alert.alert('Info', 'Edit profile functionality'),
    },
    {
      id: '2',
      icon: '🔒',
      title: 'Security Settings',
      action: () => Alert.alert('Info', 'Security settings'),
    },
    {
      id: '3',
      icon: '💳',
      title: 'Payment Methods',
      action: () => Alert.alert('Info', 'Manage payment methods'),
    },
    {
      id: '4',
      icon: '🔔',
      title: 'Notifications',
      action: () => navigation.navigate('Notifications'),
    },
    {
      id: '5',
      icon: '🌍',
      title: 'Language',
      action: () => navigation.navigate('Language'),
    },
    {
      id: '6',
      icon: '🎨',
      title: 'Theme',
      action: () => navigation.navigate('Theme'),
    },
    {
      id: '7',
      icon: '📊',
      title: 'Analytics',
      action: () => navigation.navigate('Analytics'),
    },
    {
      id: '8',
      icon: '⭐',
      title: 'Favorites',
      action: () => navigation.navigate('Favorites'),
    },
    {
      id: '9',
      icon: '📅',
      title: 'Scheduling',
      action: () => navigation.navigate('Scheduling'),
    },
    {
      id: '10',
      icon: '📍',
      title: 'Location Services',
      action: () => navigation.navigate('Location'),
    },
    {
      id: '11',
      icon: '⭐',
      title: 'Reviews',
      action: () => navigation.navigate('Review'),
    },
    {
      id: '12',
      icon: '🏪',
      title: 'Provider Dashboard',
      action: () => navigation.navigate('ProviderDashboard'),
    },
    {
      id: '13',
      icon: '🔍',
      title: 'Check Auth Status',
      action: handleCheckAuthStatus,
    },
    {
      id: '14',
      icon: '❓',
      title: 'Help & Support',
      action: () => Alert.alert('Info', 'Help and support'),
    },
    {
      id: '15',
      icon: '📄',
      title: 'Terms & Privacy',
      action: () => Alert.alert('Info', 'Terms and privacy policy'),
    },
    {
      id: '16',
      icon: '🚪',
      title: 'Logout',
      action: handleLogout,
      isDestructive: true,
    },
  ];

  const renderMenuItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.menuItem} onPress={item.action}>
      <View style={styles.menuItemLeft}>
        <Text style={styles.menuItemIcon}>{item.icon}</Text>
        <Text style={styles.menuItemTitle}>{item.title}</Text>
      </View>
      <Text style={styles.menuItemArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{user.name.charAt(0)}</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
          <Text style={styles.userLocation}>📍 {user.location}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.totalBookings}</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.averageRating}</Text>
            <Text style={styles.statLabel}>Avg. Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2024</Text>
            <Text style={styles.statLabel}>Member Since</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <View key={item.id}>
              {renderMenuItem({ item })}
              {item.id !== menuItems[menuItems.length - 1].id && (
                <View style={styles.menuDivider} />
              )}
            </View>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  userLocation: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
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
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
    marginHorizontal: 10,
  },
  menuContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#333',
  },
  menuItemArrow: {
    fontSize: 18,
    color: '#ccc',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 50,
  },
  logoutContainer: {
    margin: 20,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
});

export default ProfileScreen; 