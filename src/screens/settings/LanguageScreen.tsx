import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isAvailable: boolean;
}

interface LanguageScreenProps {
  navigation: any;
}

const LanguageScreen: React.FC<LanguageScreenProps> = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isLoading, setIsLoading] = useState(false);

  const languages: Language[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      isAvailable: true,
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      isAvailable: true,
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      isAvailable: true,
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      isAvailable: true,
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
      isAvailable: true,
    },
    {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      flag: '🇵🇹',
      isAvailable: true,
    },
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      flag: '🇷🇺',
      isAvailable: true,
    },
    {
      code: 'zh',
      name: 'Chinese (Simplified)',
      nativeName: '中文 (简体)',
      flag: '🇨🇳',
      isAvailable: true,
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵',
      isAvailable: true,
    },
    {
      code: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      flag: '🇰🇷',
      isAvailable: true,
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      isAvailable: false,
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      isAvailable: false,
    },
  ];

  const changeLanguage = async (languageCode: string) => {
    if (!languages.find(lang => lang.code === languageCode)?.isAvailable) {
      Alert.alert(
        'Coming Soon',
        'This language will be available in a future update.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsLoading(true);

    try {
      // Simulate language change
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSelectedLanguage(languageCode);
      
      Alert.alert(
        'Language Changed',
        'The app language has been updated. Some changes may require a restart.',
        [
          {
            text: 'Restart Now',
            onPress: () => {
              // In a real app, this would restart the app
              navigation.goBack();
            },
          },
          {
            text: 'Later',
            style: 'cancel',
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to change language. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        selectedLanguage === item.code && styles.selectedLanguageItem,
        !item.isAvailable && styles.unavailableLanguageItem,
      ]}
      onPress={() => changeLanguage(item.code)}
      disabled={!item.isAvailable || isLoading}
    >
      <View style={styles.languageInfo}>
        <Text style={styles.languageFlag}>{item.flag}</Text>
        <View style={styles.languageText}>
          <Text style={[
            styles.languageName,
            selectedLanguage === item.code && styles.selectedLanguageText,
            !item.isAvailable && styles.unavailableLanguageText,
          ]}>
            {item.name}
          </Text>
          <Text style={[
            styles.languageNativeName,
            selectedLanguage === item.code && styles.selectedLanguageText,
            !item.isAvailable && styles.unavailableLanguageText,
          ]}>
            {item.nativeName}
          </Text>
        </View>
      </View>
      
      <View style={styles.languageStatus}>
        {selectedLanguage === item.code && (
          <Text style={styles.currentLanguageBadge}>Current</Text>
        )}
        {!item.isAvailable && (
          <Text style={styles.comingSoonBadge}>Coming Soon</Text>
        )}
        {item.isAvailable && selectedLanguage !== item.code && (
          <View style={[
            styles.radioButton,
            selectedLanguage === item.code && styles.radioButtonSelected,
          ]}>
            {selectedLanguage === item.code && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === selectedLanguage);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
      </View>

      {/* Current Language Info */}
      <View style={styles.currentLanguageContainer}>
        <Text style={styles.currentLanguageTitle}>Current Language</Text>
        <View style={styles.currentLanguageCard}>
          <Text style={styles.currentLanguageFlag}>{getCurrentLanguage()?.flag}</Text>
          <View style={styles.currentLanguageInfo}>
            <Text style={styles.currentLanguageName}>{getCurrentLanguage()?.name}</Text>
            <Text style={styles.currentLanguageNative}>{getCurrentLanguage()?.nativeName}</Text>
          </View>
        </View>
      </View>

      {/* Language List */}
      <View style={styles.languagesContainer}>
        <Text style={styles.languagesTitle}>Select Language</Text>
        <FlatList
          data={languages}
          renderItem={renderLanguageItem}
          keyExtractor={(item) => item.code}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.languagesList}
        />
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>ℹ️ Language Information</Text>
        <Text style={styles.infoText}>
          • Changing the language will update the app interface
        </Text>
        <Text style={styles.infoText}>
          • Some content may remain in the original language
        </Text>
        <Text style={styles.infoText}>
          • You may need to restart the app for all changes to take effect
        </Text>
      </View>
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
  currentLanguageContainer: {
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
  currentLanguageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  currentLanguageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  currentLanguageFlag: {
    fontSize: 32,
    marginRight: 15,
  },
  currentLanguageInfo: {
    flex: 1,
  },
  currentLanguageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  currentLanguageNative: {
    fontSize: 14,
    color: '#666',
  },
  languagesContainer: {
    flex: 1,
    padding: 20,
  },
  languagesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  languagesList: {
    paddingBottom: 20,
  },
  languageItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedLanguageItem: {
    backgroundColor: '#f0f8ff',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  unavailableLanguageItem: {
    backgroundColor: '#f8f8f8',
    opacity: 0.6,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 15,
  },
  languageText: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  languageNativeName: {
    fontSize: 14,
    color: '#666',
  },
  selectedLanguageText: {
    color: '#007AFF',
  },
  unavailableLanguageText: {
    color: '#999',
  },
  languageStatus: {
    alignItems: 'flex-end',
  },
  currentLanguageBadge: {
    backgroundColor: '#007AFF',
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    textTransform: 'uppercase',
  },
  comingSoonBadge: {
    backgroundColor: '#FF9500',
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    textTransform: 'uppercase',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#007AFF',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  infoContainer: {
    backgroundColor: '#f0f8ff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default LanguageScreen; 