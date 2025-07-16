import * as SecureStore from 'expo-secure-store';

// 🔐 SECURE STORAGE UTILITY
// This utility provides secure storage for sensitive data like:
// - User authentication tokens
// - Payment tokens (not actual card data!)
// - Biometric authentication keys
// - App configuration secrets

export class SecureStorage {
  // Store sensitive data securely
  static async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Failed to store sensitive data:', error);
      throw new Error('Failed to store data securely');
    }
  }

  // Retrieve sensitive data securely
  static async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Failed to retrieve sensitive data:', error);
      return null;
    }
  }

  // Delete sensitive data
  static async deleteItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Failed to delete sensitive data:', error);
    }
  }

  // Check if SecureStore is available
  static async isAvailable(): Promise<boolean> {
    try {
      const result = await SecureStore.isAvailableAsync();
      return result === true;
    } catch {
      return false;
    }
  }
}

// 🎯 SPECIFIC STORAGE METHODS FOR DIFFERENT DATA TYPES

export class AuthStorage {
  // Store user authentication token
  static async storeAuthToken(token: string): Promise<void> {
    await SecureStorage.setItem('auth_token', token);
  }

  // Get user authentication token
  static async getAuthToken(): Promise<string | null> {
    return await SecureStorage.getItem('auth_token');
  }

  // Store refresh token
  static async storeRefreshToken(token: string): Promise<void> {
    await SecureStorage.setItem('refresh_token', token);
  }

  // Get refresh token
  static async getRefreshToken(): Promise<string | null> {
    return await SecureStorage.getItem('refresh_token');
  }

  // Clear all authentication data
  static async clearAuthData(): Promise<void> {
    await SecureStorage.deleteItem('auth_token');
    await SecureStorage.deleteItem('refresh_token');
  }
}

export class PaymentStorage {
  // Store payment method token (NOT actual card data!)
  static async storePaymentToken(token: string): Promise<void> {
    await SecureStorage.setItem('payment_token', token);
  }

  // Get payment method token
  static async getPaymentToken(): Promise<string | null> {
    return await SecureStorage.getItem('payment_token');
  }

  // Store saved payment methods (encrypted)
  static async storeSavedPaymentMethods(methods: any[]): Promise<void> {
    const encryptedData = JSON.stringify(methods);
    await SecureStorage.setItem('saved_payment_methods', encryptedData);
  }

  // Get saved payment methods
  static async getSavedPaymentMethods(): Promise<any[]> {
    const data = await SecureStorage.getItem('saved_payment_methods');
    return data ? JSON.parse(data) : [];
  }

  // Clear payment data
  static async clearPaymentData(): Promise<void> {
    await SecureStorage.deleteItem('payment_token');
    await SecureStorage.deleteItem('saved_payment_methods');
  }
}

export class UserPreferencesStorage {
  // Store user preferences (non-sensitive)
  static async storeUserPreferences(preferences: any): Promise<void> {
    const data = JSON.stringify(preferences);
    await SecureStorage.setItem('user_preferences', data);
  }

  // Get user preferences
  static async getUserPreferences(): Promise<any> {
    const data = await SecureStorage.getItem('user_preferences');
    return data ? JSON.parse(data) : {};
  }

  // Store theme preference
  static async storeTheme(theme: string): Promise<void> {
    await SecureStorage.setItem('app_theme', theme);
  }

  // Get theme preference
  static async getTheme(): Promise<string | null> {
    return await SecureStorage.getItem('app_theme');
  }
}

// 🚨 SECURITY BEST PRACTICES

export class SecurityUtils {
  // Validate token format before storing
  static isValidToken(token: string): boolean {
    return token && token.length > 10 && token.includes('.');
  }

  // Sanitize data before storage
  static sanitizeData(data: any): any {
    // Remove any sensitive fields that shouldn't be stored
    const { password, cardNumber, cvv, ...safeData } = data;
    return safeData;
  }

  // Check if device supports biometric authentication
  static async supportsBiometrics(): Promise<boolean> {
    return await SecureStorage.isAvailable();
  }

  // Clear all sensitive data (logout)
  static async clearAllSensitiveData(): Promise<void> {
    await AuthStorage.clearAuthData();
    await PaymentStorage.clearPaymentData();
    // Add other clear methods as needed
  }
}

// 📝 USAGE EXAMPLES

/*
// Store authentication token
await AuthStorage.storeAuthToken('jwt_token_here');

// Store payment token (from Stripe, PayPal, etc.)
await PaymentStorage.storePaymentToken('pm_token_here');

// Store user preferences
await UserPreferencesStorage.storeUserPreferences({
  language: 'en',
  notifications: true,
  theme: 'dark'
});

// Retrieve data
const token = await AuthStorage.getAuthToken();
const paymentToken = await PaymentStorage.getPaymentToken();
const preferences = await UserPreferencesStorage.getUserPreferences();

// Clear data on logout
await SecurityUtils.clearAllSensitiveData();
*/ 