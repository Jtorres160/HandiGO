import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';

interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  provider: string;
  rating: number;
  totalReviews: number;
  price: string;
  description: string;
  location: string;
  availability: string[];
  images: string[];
  features: string[];
  reviews: Review[];
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ServiceDetailScreenProps {
  navigation: any;
  route: any;
}

const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Mock service data
  const service: ServiceDetail = {
    id: '1',
    title: 'Professional House Cleaning',
    category: 'Cleaning',
    provider: 'Clean Pro Services',
    rating: 4.8,
    totalReviews: 127,
    price: '$50-80',
    description: 'Professional house cleaning service with attention to detail. Our experienced team uses eco-friendly products and follows a comprehensive cleaning checklist to ensure your home is spotless.',
    location: 'Downtown Area',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    features: [
      'Eco-friendly cleaning products',
      'Deep cleaning included',
      'Kitchen & bathroom focus',
      'Dusting & vacuuming',
      'Window cleaning',
      '2-hour service guarantee'
    ],
    reviews: [
      {
        id: '1',
        userName: 'Sarah Johnson',
        rating: 5,
        comment: 'Excellent service! The team was professional and thorough. My house looks amazing!',
        date: '2024-01-10',
      },
      {
        id: '2',
        userName: 'Mike Wilson',
        rating: 4,
        comment: 'Good cleaning service. They arrived on time and did a decent job.',
        date: '2024-01-08',
      },
      {
        id: '3',
        userName: 'Lisa Brown',
        rating: 5,
        comment: 'Highly recommend! Very detailed cleaning and great communication.',
        date: '2024-01-05',
      },
    ],
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const handleBookService = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select a date and time');
      return;
    }

    Alert.alert(
      'Confirm Booking',
      `Book ${service.title} for ${selectedDate} at ${selectedTime}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', 'Booking confirmed! You will receive a confirmation shortly.');
                          navigation.navigate('BookingsScreen');
          },
        },
      ]
    );
  };

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUserName}>{item.userName}</Text>
        <View style={styles.reviewRating}>
          <Text style={styles.starRating}>{'⭐'.repeat(item.rating)}</Text>
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
      <Text style={styles.reviewDate}>{item.date}</Text>
    </View>
  );

  const renderFeature = ({ item }: { item: string }) => (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>✓</Text>
      <Text style={styles.featureText}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{service.title}</Text>
        </View>

        {/* Service Info */}
        <View style={styles.serviceInfo}>
          <View style={styles.serviceHeader}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.servicePrice}>{service.price}</Text>
          </View>
          
          <Text style={styles.serviceProvider}>by {service.provider}</Text>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.starRating}>{'⭐'.repeat(Math.floor(service.rating))}</Text>
            <Text style={styles.ratingText}>{service.rating} ({service.totalReviews} reviews)</Text>
          </View>
          
          <Text style={styles.serviceLocation}>📍 {service.location}</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{service.description}</Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          <FlatList
            data={service.features}
            renderItem={renderFeature}
            keyExtractor={(item) => item}
            scrollEnabled={false}
          />
        </View>

        {/* Availability */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Days</Text>
          <View style={styles.availabilityContainer}>
            {service.availability.map((day) => (
              <View key={day} style={styles.availabilityDay}>
                <Text style={styles.availabilityText}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <FlatList
            data={service.reviews}
            renderItem={renderReview}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Booking Section */}
        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>Book This Service</Text>
          
          {/* Date Selection */}
          <Text style={styles.inputLabel}>Select Date</Text>
          <View style={styles.dateContainer}>
            {service.availability.slice(0, 5).map((day, index) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dateButton,
                  selectedDate === day && styles.selectedDateButton,
                ]}
                onPress={() => setSelectedDate(day)}
              >
                <Text style={[
                  styles.dateButtonText,
                  selectedDate === day && styles.selectedDateButtonText,
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Time Selection */}
          <Text style={styles.inputLabel}>Select Time</Text>
          <View style={styles.timeContainer}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeButton,
                  selectedTime === time && styles.selectedTimeButton,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeButtonText,
                  selectedTime === time && styles.selectedTimeButtonText,
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Notes */}
          <Text style={styles.inputLabel}>Special Instructions (Optional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Any special requests or instructions..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.favoriteButton]}
              onPress={() => Alert.alert('Success', 'Added to favorites!')}
            >
              <Text style={styles.favoriteButtonText}>❤️</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.bookButton]}
              onPress={handleBookService}
            >
              <Text style={styles.bookButtonText}>Book Now - {service.price}</Text>
            </TouchableOpacity>
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
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#007AFF',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  serviceInfo: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  serviceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  serviceProvider: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starRating: {
    fontSize: 16,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  serviceLocation: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureIcon: {
    fontSize: 16,
    color: '#34C759',
    marginRight: 10,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  availabilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  availabilityDay: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  availabilityText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  reviewCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  bookingSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginTop: 15,
  },
  dateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  dateButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  selectedDateButton: {
    backgroundColor: '#007AFF',
  },
  dateButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedDateButtonText: {
    color: 'white',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  selectedTimeButton: {
    backgroundColor: '#007AFF',
  },
  timeButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedTimeButtonText: {
    color: 'white',
  },
  notesInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  favoriteButton: {
    backgroundColor: '#FFE5E5',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  favoriteButtonText: {
    fontSize: 20,
  },
  bookButton: {
    backgroundColor: '#007AFF',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ServiceDetailScreen; 