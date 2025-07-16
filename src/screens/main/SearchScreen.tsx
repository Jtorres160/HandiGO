import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

interface Service {
  id: string;
  title: string;
  category: string;
  provider: string;
  rating: number;
  price: string;
  description: string;
  location: string;
}

interface SearchScreenProps {
  navigation: any;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data for services
  const allServices: Service[] = [
    {
      id: '1',
      title: 'House Cleaning',
      category: 'Cleaning',
      provider: 'Clean Pro Services',
      rating: 4.8,
      price: '$50-80',
      description: 'Professional house cleaning services',
      location: 'Downtown',
    },
    {
      id: '2',
      title: 'Plumbing Repair',
      category: 'Repairs',
      provider: 'Quick Fix Plumbing',
      rating: 4.9,
      price: '$80-150',
      description: 'Emergency plumbing services',
      location: 'North Side',
    },
    {
      id: '3',
      title: 'Math Tutoring',
      category: 'Education',
      provider: 'Tutor Plus',
      rating: 4.7,
      price: '$30-50',
      description: 'One-on-one math tutoring',
      location: 'University District',
    },
    {
      id: '4',
      title: 'Pet Sitting',
      category: 'Pet Care',
      provider: 'Pet Care Pro',
      rating: 4.6,
      price: '$25-40',
      description: 'Reliable pet sitting services',
      location: 'West End',
    },
    {
      id: '5',
      title: 'Garden Maintenance',
      category: 'Gardening',
      provider: 'Green Thumb Services',
      rating: 4.5,
      price: '$40-70',
      description: 'Regular garden maintenance',
      location: 'Suburbs',
    },
  ];

  const categories = [
    'All',
    'Cleaning',
    'Repairs',
    'Education',
    'Pet Care',
    'Gardening',
    'Moving',
  ];

  // Filter services based on search query and category
  const filteredServices = allServices.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || 
      selectedCategory === 'All' || 
      service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
      <Text style={styles.serviceDescription}>{item.description}</Text>
      <View style={styles.serviceFooter}>
        <Text style={styles.serviceLocation}>📍 {item.location}</Text>
        <Text style={styles.serviceRating}>⭐ {item.rating}</Text>
      </View>
      <View style={styles.serviceCategory}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryButton = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === item && styles.categoryButtonTextActive,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <Text style={styles.headerTitle}>Search Services</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for services..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryButton}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Results */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>
          {filteredServices.length} services found
        </Text>
        <FlatList
          data={filteredServices}
          renderItem={renderServiceCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.servicesList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchHeader: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  searchInput: {
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: 'white',
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  servicesList: {
    paddingBottom: 20,
  },
  serviceCard: {
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
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceLocation: {
    fontSize: 12,
    color: '#666',
  },
  serviceRating: {
    fontSize: 12,
    color: '#666',
  },
  serviceCategory: {
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 10,
    color: '#999',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

export default SearchScreen; 