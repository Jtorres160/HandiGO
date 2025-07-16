import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

interface ThemeScreenProps {
  navigation: any;
}

const ThemeScreen: React.FC<ThemeScreenProps> = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAutoTheme, setIsAutoTheme] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Classic light theme with dark text on light backgrounds',
      icon: '☀️',
      isActive: !isDarkMode && !isAutoTheme,
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes with light text on dark backgrounds',
      icon: '🌙',
      isActive: isDarkMode && !isAutoTheme,
    },
    {
      id: 'auto',
      name: 'Auto (System)',
      description: 'Follows your device\'s system theme setting',
      icon: '🔄',
      isActive: isAutoTheme,
    },
  ];

  const changeTheme = async (themeId: string) => {
    setIsLoading(true);

    try {
      // Simulate theme change
      await new Promise(resolve => setTimeout(resolve, 800));

      switch (themeId) {
        case 'light':
          setIsDarkMode(false);
          setIsAutoTheme(false);
          break;
        case 'dark':
          setIsDarkMode(true);
          setIsAutoTheme(false);
          break;
        case 'auto':
          setIsAutoTheme(true);
          // In a real app, this would detect system theme
          setIsDarkMode(false);
          break;
      }

      Alert.alert(
        'Theme Updated',
        'Your theme preference has been saved.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to change theme. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderThemeCard = (theme: any) => (
    <TouchableOpacity
      key={theme.id}
      style={[
        styles.themeCard,
        theme.isActive && styles.activeThemeCard,
        isDarkMode && styles.themeCardDark,
      ]}
      onPress={() => changeTheme(theme.id)}
      disabled={isLoading}
    >
      <View style={styles.themeHeader}>
        <Text style={styles.themeIcon}>{theme.icon}</Text>
        <View style={styles.themeInfo}>
          <Text style={[
            styles.themeName,
            isDarkMode && styles.themeTextDark,
          ]}>
            {theme.name}
          </Text>
          <Text style={[
            styles.themeDescription,
            isDarkMode && styles.themeTextSecondaryDark,
          ]}>
            {theme.description}
          </Text>
        </View>
        <View style={[
          styles.radioButton,
          theme.isActive && styles.radioButtonSelected,
        ]}>
          {theme.isActive && (
            <View style={styles.radioButtonInner} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPreviewCard = () => (
    <View style={[
      styles.previewCard,
      isDarkMode && styles.previewCardDark,
    ]}>
      <Text style={[
        styles.previewTitle,
        isDarkMode && styles.themeTextDark,
      ]}>
        Theme Preview
      </Text>
      
      <View style={[
        styles.previewContent,
        isDarkMode && styles.previewContentDark,
      ]}>
        <View style={styles.previewHeader}>
          <Text style={[
            styles.previewHeaderText,
            isDarkMode && styles.themeTextDark,
          ]}>
            Sample Content
          </Text>
        </View>
        
        <View style={styles.previewBody}>
          <Text style={[
            styles.previewBodyText,
            isDarkMode && styles.themeTextSecondaryDark,
          ]}>
            This is how text will appear in your selected theme. The interface adapts to provide the best reading experience.
          </Text>
          
          <View style={[
            styles.previewButton,
            isDarkMode && styles.previewButtonDark,
          ]}>
            <Text style={[
              styles.previewButtonText,
              isDarkMode && styles.previewButtonTextDark,
            ]}>
              Sample Button
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[
      styles.container,
      isDarkMode && styles.containerDark,
    ]}>
      {/* Header */}
      <View style={[
        styles.header,
        isDarkMode && styles.headerDark,
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theme</Text>
      </View>

      {/* Theme Options */}
      <View style={styles.themesContainer}>
        <Text style={[
          styles.sectionTitle,
          isDarkMode && styles.themeTextDark,
        ]}>
          Choose Theme
        </Text>
        {themes.map(renderThemeCard)}
      </View>

      {/* Preview */}
      <View style={styles.previewContainer}>
        {renderPreviewCard()}
      </View>

      {/* Additional Options */}
      <View style={[
        styles.optionsContainer,
        isDarkMode && styles.optionsContainerDark,
      ]}>
        <Text style={[
          styles.sectionTitle,
          isDarkMode && styles.themeTextDark,
        ]}>
          Additional Options
        </Text>
        
        <View style={[
          styles.optionItem,
          isDarkMode && styles.optionItemDark,
        ]}>
          <View style={styles.optionInfo}>
            <Text style={[
              styles.optionTitle,
              isDarkMode && styles.themeTextDark,
            ]}>
              Reduce Motion
            </Text>
            <Text style={[
              styles.optionDescription,
              isDarkMode && styles.themeTextSecondaryDark,
            ]}>
              Minimize animations for accessibility
            </Text>
          </View>
          <Switch
            value={false}
            onValueChange={() => Alert.alert('Coming Soon', 'This feature will be available soon')}
            trackColor={{ false: '#767577', true: '#007AFF' }}
            thumbColor={false ? '#f4f3f4' : '#ffffff'}
          />
        </View>

        <View style={[
          styles.optionItem,
          isDarkMode && styles.optionItemDark,
        ]}>
          <View style={styles.optionInfo}>
            <Text style={[
              styles.optionTitle,
              isDarkMode && styles.themeTextDark,
            ]}>
              High Contrast
            </Text>
            <Text style={[
              styles.optionDescription,
              isDarkMode && styles.themeTextSecondaryDark,
            ]}>
              Increase contrast for better visibility
            </Text>
          </View>
          <Switch
            value={false}
            onValueChange={() => Alert.alert('Coming Soon', 'This feature will be available soon')}
            trackColor={{ false: '#767577', true: '#007AFF' }}
            thumbColor={false ? '#f4f3f4' : '#ffffff'}
          />
        </View>
      </View>

      {/* Info Section */}
      <View style={[
        styles.infoContainer,
        isDarkMode && styles.infoContainerDark,
      ]}>
        <Text style={[
          styles.infoTitle,
          isDarkMode && styles.themeTextDark,
        ]}>
          ℹ️ Theme Information
        </Text>
        <Text style={[
          styles.infoText,
          isDarkMode && styles.themeTextSecondaryDark,
        ]}>
          • Theme changes apply immediately across the app
        </Text>
        <Text style={[
          styles.infoText,
          isDarkMode && styles.themeTextSecondaryDark,
        ]}>
          • Auto theme follows your device's system setting
        </Text>
        <Text style={[
          styles.infoText,
          isDarkMode && styles.themeTextSecondaryDark,
        ]}>
          • Your preference is saved and remembered
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
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#007AFF',
  },
  headerDark: {
    backgroundColor: '#0A84FF',
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
  themesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  themeCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  themeCardDark: {
    backgroundColor: '#2c2c2e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  activeThemeCard: {
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  themeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  themeTextDark: {
    color: '#ffffff',
  },
  themeDescription: {
    fontSize: 14,
    color: '#666',
  },
  themeTextSecondaryDark: {
    color: '#8e8e93',
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
  previewContainer: {
    padding: 20,
  },
  previewCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  previewCardDark: {
    backgroundColor: '#2c2c2e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
  },
  previewContent: {
    backgroundColor: '#f8f9fa',
    margin: 20,
    marginTop: 0,
    borderRadius: 8,
  },
  previewContentDark: {
    backgroundColor: '#1c1c1e',
  },
  previewHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  previewHeaderDark: {
    borderBottomColor: '#38383a',
  },
  previewHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  previewBody: {
    padding: 15,
  },
  previewBodyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  previewButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  previewButtonDark: {
    backgroundColor: '#0A84FF',
  },
  previewButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  previewButtonTextDark: {
    color: '#ffffff',
  },
  optionsContainer: {
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
  optionsContainerDark: {
    backgroundColor: '#2c2c2e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionItemDark: {
    borderBottomColor: '#38383a',
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    backgroundColor: '#f0f8ff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  infoContainerDark: {
    backgroundColor: '#1c1c1e',
    borderColor: '#0A84FF',
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

export default ThemeScreen; 