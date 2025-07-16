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

interface Review {
  id: string;
  serviceTitle: string;
  providerName: string;
  rating: number;
  comment: string;
  date: string;
  categories: ReviewCategory[];
}

interface ReviewCategory {
  name: string;
  rating: number;
}

interface ReviewScreenProps {
  navigation: any;
  route: any;
}

const ReviewScreen: React.FC<ReviewScreenProps> = ({ navigation, route }) => {
  const [overallRating, setOverallRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [categoryRatings, setCategoryRatings] = useState<ReviewCategory[]>([
    { name: 'Quality', rating: 0 },
    { name: 'Punctuality', rating: 0 },
    { name: 'Communication', rating: 0 },
    { name: 'Value for Money', rating: 0 },
    { name: 'Professionalism', rating: 0 },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock booking data
  const bookingData = {
    serviceTitle: 'Professional House Cleaning',
    providerName: 'Clean Pro Services',
    bookingDate: '2024-01-15',
    bookingTime: '10:00 AM',
    price: '$65',
  };

  const updateCategoryRating = (categoryName: string, rating: number) => {
    setCategoryRatings(prev =>
      prev.map(category =>
        category.name === categoryName ? { ...category, rating } : category
      )
    );
  };

  const getAverageRating = () => {
    const total = categoryRatings.reduce((sum, category) => sum + category.rating, 0);
    return total / categoryRatings.length;
  };

  const validateReview = () => {
    if (overallRating === 0) {
      Alert.alert('Error', 'Please provide an overall rating');
      return false;
    }
    if (!comment.trim()) {
      Alert.alert('Error', 'Please write a review comment');
      return false;
    }
    if (comment.trim().length < 10) {
      Alert.alert('Error', 'Review comment must be at least 10 characters');
      return false;
    }
    return true;
  };

  const submitReview = async () => {
    if (!validateReview()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        'Review Submitted!',
        'Thank you for your feedback. Your review helps other users make informed decisions.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('BookingsScreen');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarRating = (rating: number, onRatingChange: (rating: number) => void, size: number = 20) => (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onRatingChange(star)}
          style={styles.starButton}
        >
          <Text style={[styles.star, { fontSize: size }]}>
            {star <= rating ? '⭐' : '☆'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderCategoryRating = (category: ReviewCategory) => (
    <View key={category.name} style={styles.categoryRating}>
      <Text style={styles.categoryName}>{category.name}</Text>
      {renderStarRating(category.rating, (rating) => updateCategoryRating(category.name, rating), 16)}
      <Text style={styles.categoryRatingText}>{category.rating}/5</Text>
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
          <Text style={styles.headerTitle}>Write a Review</Text>
        </View>

        {/* Booking Info */}
        <View style={styles.bookingInfo}>
          <Text style={styles.bookingTitle}>{bookingData.serviceTitle}</Text>
          <Text style={styles.bookingProvider}>by {bookingData.providerName}</Text>
          <Text style={styles.bookingDetails}>
            📅 {bookingData.bookingDate} at {bookingData.bookingTime} • {bookingData.price}
          </Text>
        </View>

        {/* Overall Rating */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>Overall Rating</Text>
          <View style={styles.overallRatingContainer}>
            {renderStarRating(overallRating, setOverallRating, 32)}
            <Text style={styles.ratingText}>{overallRating}/5</Text>
          </View>
        </View>

        {/* Category Ratings */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Rate by Category</Text>
          {categoryRatings.map(renderCategoryRating)}
        </View>

        {/* Review Comment */}
        <View style={styles.commentSection}>
          <Text style={styles.sectionTitle}>Your Review</Text>
          <Text style={styles.commentHint}>
            Share your experience with this service (minimum 10 characters)
          </Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Tell us about your experience..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={6}
            maxLength={500}
          />
          <Text style={styles.characterCount}>
            {comment.length}/500 characters
          </Text>
        </View>

        {/* Review Guidelines */}
        <View style={styles.guidelinesSection}>
          <Text style={styles.guidelinesTitle}>Review Guidelines</Text>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineIcon}>✓</Text>
            <Text style={styles.guidelineText}>Be honest and specific about your experience</Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineIcon}>✓</Text>
            <Text style={styles.guidelineText}>Focus on the service quality and professionalism</Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineIcon}>✓</Text>
            <Text style={styles.guidelineText}>Avoid personal attacks or inappropriate language</Text>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={submitReview}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Text>
        </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  bookingInfo: {
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
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  bookingProvider: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  bookingDetails: {
    fontSize: 14,
    color: '#666',
  },
  ratingSection: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  overallRatingContainer: {
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starButton: {
    padding: 5,
  },
  star: {
    color: '#FFD700',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  categorySection: {
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
  categoryRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  categoryRatingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  commentSection: {
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
  commentHint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  commentInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 5,
  },
  guidelinesSection: {
    backgroundColor: '#f0f8ff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 15,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  guidelineIcon: {
    fontSize: 16,
    color: '#34C759',
    marginRight: 10,
    fontWeight: 'bold',
  },
  guidelineText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReviewScreen; 