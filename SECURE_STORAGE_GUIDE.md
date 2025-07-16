# 🔐 Secure Storage Guide for React Native/Expo

## Overview

This guide explains how to properly store sensitive data in your React Native/Expo app without exposing it to security risks.

## 🚨 What NOT to Store

**NEVER store these in plain text or regular storage:**
- Credit card numbers
- CVV codes
- Passwords
- Social Security numbers
- API keys
- Private keys
- Biometric data

## ✅ What TO Store Securely

**Store these using secure storage:**
- Authentication tokens (JWT)
- Refresh tokens
- Payment method tokens (from Stripe, PayPal, etc.)
- Encryption keys
- Session data
- Biometric authentication keys

## 🛠️ Secure Storage Options

### 1. Expo SecureStore (Recommended for Expo)

```bash
npx expo install expo-secure-store
```

**Features:**
- Uses iOS Keychain and Android Keystore
- Encrypted storage
- Biometric authentication support
- Automatic key management

### 2. React Native Keychain (For bare React Native)

```bash
npm install react-native-keychain
```

### 3. AsyncStorage (For non-sensitive data only)

```bash
npx expo install @react-native-async-storage/async-storage
```

## 📝 Implementation Examples

### Basic Secure Storage

```typescript
import * as SecureStore from 'expo-secure-store';

// Store data securely
await SecureStore.setItemAsync('auth_token', 'your_jwt_token');

// Retrieve data securely
const token = await SecureStore.getItemAsync('auth_token');

// Delete data
await SecureStore.deleteItemAsync('auth_token');
```

### With Biometric Authentication

```typescript
// Store with biometric auth
await SecureStore.setItemAsync('payment_token', token, {
  requireAuthentication: true,
  authenticationPrompt: 'Authenticate to access payment data'
});

// Retrieve with biometric auth
const token = await SecureStore.getItemAsync('payment_token', {
  requireAuthentication: true,
  authenticationPrompt: 'Authenticate to access payment data'
});
```

## 🏗️ Architecture Patterns

### 1. Token-Based Authentication

```typescript
// Store tokens securely
await AuthStorage.storeAuthToken(jwtToken);
await AuthStorage.storeRefreshToken(refreshToken);

// Use tokens for API calls
const token = await AuthStorage.getAuthToken();
const response = await fetch('/api/protected', {
  headers: { Authorization: `Bearer ${token}` }
});
```

### 2. Payment Token Storage

```typescript
// Store payment method token (NOT actual card data!)
await PaymentStorage.storePaymentToken(stripePaymentMethodId);

// Use token for payments
const paymentToken = await PaymentStorage.getPaymentToken();
const payment = await stripe.confirmPayment({
  paymentMethod: paymentToken,
  amount: 1000
});
```

### 3. User Preferences (Non-sensitive)

```typescript
// Store user preferences in regular storage
await AsyncStorage.setItem('user_preferences', JSON.stringify({
  theme: 'dark',
  language: 'en',
  notifications: true
}));
```

## 🔒 Security Best Practices

### 1. Data Sanitization

```typescript
// Always sanitize data before storage
const sanitizeUserData = (userData: any) => {
  const { password, cardNumber, cvv, ...safeData } = userData;
  return safeData;
};

// Store only safe data
const safeData = sanitizeUserData(userData);
await AsyncStorage.setItem('user_data', JSON.stringify(safeData));
```

### 2. Token Validation

```typescript
// Validate tokens before storing
const isValidToken = (token: string): boolean => {
  return token && token.length > 10 && token.includes('.');
};

if (isValidToken(authToken)) {
  await AuthStorage.storeAuthToken(authToken);
}
```

### 3. Secure Logout

```typescript
// Clear all sensitive data on logout
const secureLogout = async () => {
  await AuthStorage.clearAuthData();
  await PaymentStorage.clearPaymentData();
  await SecureStore.deleteItemAsync('user_session');
};
```

### 4. Error Handling

```typescript
try {
  const token = await SecureStore.getItemAsync('auth_token');
  if (!token) {
    // Handle missing token
    navigation.navigate('Login');
  }
} catch (error) {
  console.error('Failed to retrieve token:', error);
  // Handle error gracefully
}
```

## 🎯 Real-World Examples

### Login Flow

```typescript
const handleLogin = async (email: string, password: string) => {
  try {
    // 1. Call API with credentials
    const response = await loginAPI(email, password);
    
    // 2. Store tokens securely
    await AuthStorage.storeAuthToken(response.authToken);
    await AuthStorage.storeRefreshToken(response.refreshToken);
    
    // 3. Store user data (non-sensitive)
    const userData = sanitizeUserData(response.user);
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
    
    // 4. Navigate to main app
    navigation.navigate('MainApp');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Payment Flow

```typescript
const handlePayment = async (cardData: any) => {
  try {
    // 1. Create payment method with Stripe
    const paymentMethod = await stripe.createPaymentMethod({
      type: 'card',
      card: cardData
    });
    
    // 2. Store payment method token (NOT card data)
    await PaymentStorage.storePaymentToken(paymentMethod.id);
    
    // 3. Process payment
    const payment = await stripe.confirmPayment({
      paymentMethod: paymentMethod.id,
      amount: 1000
    });
    
    // 4. Clear sensitive data from memory
    setCardNumber('');
    setCvv('');
    setExpiryDate('');
  } catch (error) {
    console.error('Payment failed:', error);
  }
};
```

## 🚨 Common Security Mistakes

### ❌ DON'T DO THIS:

```typescript
// Never store sensitive data in plain text
await AsyncStorage.setItem('password', userPassword);
await AsyncStorage.setItem('card_number', '1234-5678-9012-3456');

// Never log sensitive data
console.log('User password:', password);
console.log('Card number:', cardNumber);

// Never store sensitive data in component state
const [cardNumber, setCardNumber] = useState('1234-5678-9012-3456');
```

### ✅ DO THIS INSTEAD:

```typescript
// Store tokens securely
await SecureStore.setItemAsync('auth_token', jwtToken);

// Log only non-sensitive data
console.log('Login attempt for email:', email);

// Clear sensitive data after use
setCardNumber('');
setCvv('');
```

## 🔍 Testing Secure Storage

### Check if SecureStore is Available

```typescript
const checkSecureStorage = async () => {
  const isAvailable = await SecureStore.isAvailableAsync();
  console.log('SecureStore available:', isAvailable);
};
```

### Test Token Storage

```typescript
const testTokenStorage = async () => {
  const testToken = 'test_jwt_token_123';
  
  // Store token
  await AuthStorage.storeAuthToken(testToken);
  
  // Retrieve token
  const retrievedToken = await AuthStorage.getAuthToken();
  
  // Verify
  console.log('Token stored correctly:', retrievedToken === testToken);
};
```

## 📱 Platform-Specific Considerations

### iOS
- Uses iOS Keychain
- Supports biometric authentication
- Automatic encryption
- Survives app updates

### Android
- Uses Android Keystore
- Supports biometric authentication
- Hardware-backed encryption
- Survives app updates

### Web (Expo)
- Uses browser's secure storage
- Limited compared to native
- Consider server-side storage for web

## 🎯 Summary

1. **Use Expo SecureStore** for sensitive data
2. **Never store** passwords, card numbers, or CVV
3. **Store tokens** instead of raw sensitive data
4. **Sanitize data** before storage
5. **Clear sensitive data** after use
6. **Handle errors** gracefully
7. **Test security** thoroughly

## 🔗 Additional Resources

- [Expo SecureStore Documentation](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [React Native Security Best Practices](https://reactnative.dev/docs/security)
- [OWASP Mobile Security Guidelines](https://owasp.org/www-project-mobile-security-testing-guide/)
- [Stripe Security Best Practices](https://stripe.com/docs/security)

---

**Remember: Security is not a feature, it's a requirement!** 🔐 