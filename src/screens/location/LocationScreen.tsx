import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';

interface NearbyProvider {
  id: string;
  name: string;
  service: string;
  rating: number;
  distance: number;
  price: string;
  isAvailable: boolean;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

interface LocationScreenProps {
  navigation: any;
}

const LocationScreen: React.FC<LocationScreenProps> = ({ navigation }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nearbyProviders, setNearbyProviders] = useState<NearbyProvider[]>([]);
  const [selectedRadius, setSelectedRadius] = useState<number>(5); // km

  // Mock nearby providers data
  const mockProviders: NearbyProvider[] = [
    {
      id: '1',
      name: 'Clean Pro Services',
      service: 'House Cleaning',
      rating: 4.8,
      distance: 0.5,
      price: '$50-80',
      isAvailable: true,
      location: {
        latitude: 40.7128,
        longitude: -74.0060,
        address: '123 Main St, Downtown',
      },
    },
    {
      id: '2',
      name: 'Quick Fix Plumbing',
      service: 'Plumbing Repair',
      rating: 4.9,
      distance: 1.2,
      price: '$80-150',
      isAvailable: true,
      location: {
        latitude: 40.7140,
        longitude: -74.0080,
        address: '456 Oak Ave, Midtown',
      },
    },
    {
      id: '3',
      name: 'Tutor Plus',
      service: 'Math Tutoring',
      rating: 4.7,
      distance: 2.1,
      price: '$30-50',
      isAvailable: false,
      location: {
        latitude: 40.7160,
        longitude: -74.0100,
        address: '789 Pine St, Uptown',
      },
    },
    {
      id: '4',
      name: 'Pet Care Pro',
      service: 'Pet Sitting',
      rating: 4.6,
      distance: 0.8,
      price: '$25-40',
      isAvailable: true,
      location: {
        latitude: 40.7135,
        longitude: -74.0070,
        address: '321 Elm St, Downtown',
      },
    },
    {
      id: '5',
      name: 'Green Thumb Services',
      service: 'Garden Maintenance',
      rating: 4.5,
      distance: 3.5,
      price: '$40-70',
      isAvailable: true,
      location: {
        latitude: 40.7200,
        longitude: -74.0150,
        address: '654 Maple Dr, Suburbs',
      },
    },
  ];

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setIsLoading(false);
        return;
      }

      // Get current location
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      setLocation(currentLocation);
      
      // Simulate finding nearby providers
      setTimeout(() => {
        const filteredProviders = mockProviders.filter(
          provider => provider.distance <= selectedRadius
        );
        setNearbyProviders(filteredProviders);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      setErrorMsg('Error getting location');
      setIsLoading(false);
    }
  };

  const refreshLocation = () => {
    getCurrentLocation();
  };

  const getDistanceText = (distance: number) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m away`;
    }
    return `${distance.toFixed(1)}km away`;
  };

  const getAvailabilityColor = (isAvailable: boolean) => {
    return isAvailable ? '#34C759' : '#FF3B30';
  };

  const getAvailabilityText = (isAvailable: boolean) => {
    return isAvailable ? 'Available' : 'Unavailable';
  };

  const renderProviderCard = ({ item }: { item: NearbyProvider }) => (
    <TouchableOpacity 
      style={styles.providerCard}
      onPress={() => navigation.navigate('ServiceDetail', { 
        serviceId: item.id,
        providerLocation: item.location,
      })}
    >
      <View style={styles.providerHeader}>
        <Text style={styles.providerName}>{item.name}</Text>
        <View style={[
          styles.availabilityBadge,
          { backgroundColor: getAvailabilityColor(item.isAvailable) }
        ]}>
          <Text style={styles.availabilityText}>
            {getAvailabilityText(item.isAvailable)}
          </Text>
        </View>
      </View>
      
      <Text style={styles.serviceType}>{item.service}</Text>
      
      <View style={styles.providerDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>⭐</Text>
          <Text style={styles.detailText}>{item.rating}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>📍</Text>
          <Text style={styles.detailText}>{getDistanceText(item.distance)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>💰</Text>
          <Text style={styles.detailText}>{item.price}</Text>
        </View>
      </View>
      
      <Text style={styles.providerAddress}>{item.location.address}</Text>
    </TouchableOpacity>
  );

  const renderRadiusButton = (radius: number) => (
    <TouchableOpacity
      key={radius}
      style={[
        styles.radiusButton,
        selectedRadius === radius && styles.selectedRadiusButton,
      ]}
      onPress={() => {
        setSelectedRadius(radius);
        const filteredProviders = mockProviders.filter(
          provider => provider.distance <= radius
        );
        setNearbyProviders(filteredProviders);
      }}
    >
      <Text style={[
        styles.radiusButtonText,
        selectedRadius === radius && styles.selectedRadiusButtonText,
      ]}>
        {radius}km
      </Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Finding services near you...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (errorMsg) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>📍</Text>
          <Text style={styles.errorTitle}>Location Access Required</Text>
          <Text style={styles.errorMessage}>{errorMsg}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refreshLocation}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services Near You</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={refreshLocation}>
          <Text style={styles.refreshButtonText}>🔄</Text>
        </TouchableOpacity>
      </View>

      {/* Location Info */}
      <View style={styles.locationInfo}>
        <Text style={styles.locationIcon}>📍</Text>
        <Text style={styles.locationText}>
          {location ? 'Using your current location' : 'Location not available'}
        </Text>
      </View>

      {/* Radius Filter */}
      <View style={styles.radiusSection}>
        <Text style={styles.radiusTitle}>Search Radius</Text>
        <View style={styles.radiusButtons}>
          {[1, 3, 5, 10, 20].map(renderRadiusButton)}
        </View>
      </View>

      {/* Results */}
      <View style={styles.resultsSection}>
        <Text style={styles.resultsTitle}>
          {nearbyProviders.length} services found within {selectedRadius}km
        </Text>
        
        {nearbyProviders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🔍</Text>
            <Text style={styles.emptyStateTitle}>No services found</Text>
            <Text style={styles.emptyStateMessage}>
              Try increasing the search radius or check back later.
            </Text>
          </View>
        ) : (
          <FlatList
            data={nearbyProviders}
            renderItem={renderProviderCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.providersList}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 15,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
  refreshButton: {
    padding: 8,
  },
  refreshButtonText: {
    fontSize: 20,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
  },
  radiusSection: {
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
  radiusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  radiusButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  radiusButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectedRadiusButton: {
    backgroundColor: '#007AFF',
  },
  radiusButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedRadiusButtonText: {
    color: 'white',
  },
  resultsSection: {
    flex: 1,
    padding: 20,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  providersList: {
    paddingBottom: 20,
  },
  providerCard: {
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
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
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
  serviceType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  providerDetails: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  providerAddress: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
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

export default LocationScreen; 