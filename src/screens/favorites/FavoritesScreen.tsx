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

interface FavoriteProvider {
  id: string;
  name: string;
  service: string;
  rating: number;
  totalReviews: number;
  price: string;
  location: string;
  isAvailable: boolean;
  lastBooked: string;
  totalBookings: number;
  image?: string;
}

interface FavoritesScreenProps {
  navigation: any;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<FavoriteProvider[]>([
    {
      id: '1',
      name: 'Clean Pro Services',
      service: 'House Cleaning',
      rating: 4.8,
      totalReviews: 127,
      price: '$50-80',
      location: 'Downtown',
      isAvailable: true,
      lastBooked: '2024-01-10',
      totalBookings: 5,
    },
    {
      id: '2',
      name: 'Quick Fix Plumbing',
      service: 'Plumbing Repair',
      rating: 4.9,
      totalReviews: 89,
      price: '$80-150',
      location: 'North Side',
      isAvailable: true,
      lastBooked: '2024-01-05',
      totalBookings: 3,
    },
    {
      id: '3',
      name: 'Tutor Plus',
      service: 'Math Tutoring',
      rating: 4.7,
      totalReviews: 156,
      price: '$30-50',
      location: 'University District',
      isAvailable: false,
      lastBooked: '2024-01-08',
      totalBookings: 8,
    },
    {
      id: '4',
      name: 'Pet Care Pro',
      service: 'Pet Sitting',
      rating: 4.6,
      totalReviews: 203,
      price: '$25-40',
      location: 'West End',
      isAvailable: true,
      lastBooked: '2024-01-12',
      totalBookings: 12,
    },
  ]);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const removeFavorite = (providerId: string) => {
    Alert.alert(
      'Remove from Favorites',
      'Are you sure you want to remove this provider from your favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setFavorites(prev => prev.filter(fav => fav.id !== providerId));
            Alert.alert('Success', 'Provider removed from favorites');
          },
        },
      ]
    );
  };

  const bookService = (provider: FavoriteProvider) => {
    navigation.navigate('ServiceDetail', { 
      serviceId: provider.id,
      providerName: provider.name,
    });
  };

  const getAvailabilityColor = (isAvailable: boolean) => {
    return isAvailable ? '#34C759' : '#FF3B30';
  };

  const getAvailabilityText = (isAvailable: boolean) => {
    return isAvailable ? 'Available' : 'Unavailable';
  };

  const formatLastBooked = (date: string) => {
    const lastBooked = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastBooked.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const renderFavoriteCard = ({ item }: { item: FavoriteProvider }) => (
    <View style={styles.favoriteCard}>
      <View style={styles.cardHeader}>
        <View style={styles.providerInfo}>
          <Text style={styles.providerName}>{item.name}</Text>
          <Text style={styles.serviceType}>{item.service}</Text>
        </View>
        <View style={[
          styles.availabilityBadge,
          { backgroundColor: getAvailabilityColor(item.isAvailable) }
        ]}>
          <Text style={styles.availabilityText}>
            {getAvailabilityText(item.isAvailable)}
          </Text>
        </View>
      </View>

      <View style={styles.ratingContainer}>
        <Text style={styles.starRating}>{'⭐'.repeat(Math.floor(item.rating))}</Text>
        <Text style={styles.ratingText}>{item.rating} ({item.totalReviews} reviews)</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>💰</Text>
          <Text style={styles.detailText}>{item.price}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>📍</Text>
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>📅</Text>
          <Text style={styles.detailText}>Last: {formatLastBooked(item.lastBooked)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>🎯</Text>
          <Text style={styles.detailText}>{item.totalBookings} bookings</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.bookButton]}
          onPress={() => bookService(item)}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.removeButton]}
          onPress={() => removeFavorite(item.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderGridItem = ({ item }: { item: FavoriteProvider }) => (
    <TouchableOpacity 
      style={styles.gridItem}
      onPress={() => bookService(item)}
    >
      <View style={styles.gridItemHeader}>
        <Text style={styles.gridProviderName}>{item.name}</Text>
        <TouchableOpacity
          style={styles.gridRemoveButton}
          onPress={() => removeFavorite(item.id)}
        >
          <Text style={styles.gridRemoveIcon}>×</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.gridServiceType}>{item.service}</Text>
      
      <View style={styles.gridRating}>
        <Text style={styles.gridStars}>{'⭐'.repeat(Math.floor(item.rating))}</Text>
        <Text style={styles.gridRatingText}>{item.rating}</Text>
      </View>
      
      <Text style={styles.gridPrice}>{item.price}</Text>
      
      <View style={[
        styles.gridAvailability,
        { backgroundColor: getAvailabilityColor(item.isAvailable) }
      ]}>
        <Text style={styles.gridAvailabilityText}>
          {getAvailabilityText(item.isAvailable)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Favorites</Text>
        </View>
        
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>❤️</Text>
          <Text style={styles.emptyStateTitle}>No favorites yet</Text>
          <Text style={styles.emptyStateMessage}>
            Start exploring services and add your favorite providers to this list for quick access.
          </Text>
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.exploreButtonText}>Explore Services</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'list' && styles.activeViewMode]}
            onPress={() => setViewMode('list')}
          >
            <Text style={[styles.viewModeText, viewMode === 'list' && styles.activeViewModeText]}>
              📋
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'grid' && styles.activeViewMode]}
            onPress={() => setViewMode('grid')}
          >
            <Text style={[styles.viewModeText, viewMode === 'grid' && styles.activeViewModeText]}>
              🔲
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Total Favorites</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {favorites.filter(fav => fav.isAvailable).length}
          </Text>
          <Text style={styles.statLabel}>Available Now</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {favorites.reduce((sum, fav) => sum + fav.totalBookings, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Bookings</Text>
        </View>
      </View>

      {/* Favorites List/Grid */}
      <FlatList
        data={favorites}
        renderItem={viewMode === 'list' ? renderFavoriteCard : renderGridItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.favoritesList,
          viewMode === 'grid' && styles.gridContainer,
        ]}
        numColumns={viewMode === 'grid' ? 2 : 1}
      />
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
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  viewModeButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeViewMode: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  viewModeText: {
    fontSize: 16,
    color: 'white',
  },
  activeViewModeText: {
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
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
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
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
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
  favoritesList: {
    padding: 20,
  },
  gridContainer: {
    paddingHorizontal: 10,
  },
  favoriteCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  serviceType: {
    fontSize: 14,
    color: '#666',
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  starRating: {
    fontSize: 14,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  bookButton: {
    backgroundColor: '#007AFF',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  removeButton: {
    backgroundColor: '#FFE5E5',
  },
  removeButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  gridItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    margin: 5,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gridItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  gridProviderName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  gridRemoveButton: {
    padding: 2,
  },
  gridRemoveIcon: {
    fontSize: 18,
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  gridServiceType: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  gridRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridStars: {
    fontSize: 12,
    marginRight: 4,
  },
  gridRatingText: {
    fontSize: 12,
    color: '#666',
  },
  gridPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  gridAvailability: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  gridAvailabilityText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
    textTransform: 'uppercase',
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
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FavoritesScreen; 