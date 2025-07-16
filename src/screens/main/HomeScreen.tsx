import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

interface Service {
  id: string;
  title: string;
  category: string;
  provider: string;
  rating: number;
  price: string;
  image?: string;
}

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Mock data for featured services
  const featuredServices: Service[] = [
    {
      id: '1',
      title: 'House Cleaning',
      category: 'Cleaning',
      provider: 'Clean Pro Services',
      rating: 4.8,
      price: '$50-80',
    },
    {
      id: '2',
      title: 'Plumbing Repair',
      category: 'Home Repair',
      provider: 'Quick Fix Plumbing',
      rating: 4.9,
      price: '$80-150',
    },
    {
      id: '3',
      title: 'Math Tutoring',
      category: 'Education',
      provider: 'Tutor Plus',
      rating: 4.7,
      price: '$30-50',
    },
    {
      id: '4',
      title: 'Pet Sitting',
      category: 'Pet Care',
      provider: 'Pet Care Pro',
      rating: 4.6,
      price: '$25-40',
    },
  ];

  const serviceCategories = [
    { id: '1', name: 'Cleaning', icon: '🧹' },
    { id: '2', name: 'Repairs', icon: '🔧' },
    { id: '3', name: 'Tutoring', icon: '📚' },
    { id: '4', name: 'Pet Care', icon: '🐕' },
    { id: '5', name: 'Gardening', icon: '🌱' },
    { id: '6', name: 'Moving', icon: '📦' },
  ];

  const renderServiceCard = ({ item }: { item: Service }) => (
    <TouchableOpacity 
      style={styles.serviceCard}
      onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}
    >
      <View style={styles.serviceCardHeader}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <Text style={styles.servicePrice}>{item.price}</Text>
      </View>
      <Text style={styles.serviceProvider}>{item.provider}</Text>
      <View style={styles.serviceFooter}>
        <Text style={styles.serviceCategory}>{item.category}</Text>
        <Text style={styles.serviceRating}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Local Services</Text>
          <Text style={styles.headerSubtitle}>Find trusted services near you</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.quickActionText}>🔍 Search Services</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('BookingsScreen')}
          >
            <Text style={styles.quickActionText}>📅 My Bookings</Text>
          </TouchableOpacity>
        </View>

        {/* Service Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Categories</Text>
          <FlatList
            data={serviceCategories}
            renderItem={renderCategoryCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Services</Text>
          <FlatList
            data={featuredServices}
            renderItem={renderServiceCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
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
    padding: 20,
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
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
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 15,
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  serviceCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  servicePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  serviceProvider: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceCategory: {
    fontSize: 12,
    color: '#999',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  serviceRating: {
    fontSize: 12,
    color: '#666',
  },
});

export default HomeScreen; 