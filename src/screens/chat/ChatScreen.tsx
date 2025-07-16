import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'provider';
  timestamp: Date;
  isRead: boolean;
}

interface ChatScreenProps {
  navigation: any;
  route: any;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation, route }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I have a booking for house cleaning tomorrow at 10 AM. Is that still confirmed?',
      sender: 'user',
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
    },
    {
      id: '2',
      text: 'Yes, absolutely! We\'ll be there at 10 AM sharp. Is there anything specific you\'d like us to focus on?',
      sender: 'provider',
      timestamp: new Date(Date.now() - 3500000),
      isRead: true,
    },
    {
      id: '3',
      text: 'Great! Could you please pay extra attention to the kitchen and bathrooms?',
      sender: 'user',
      timestamp: new Date(Date.now() - 3400000),
      isRead: true,
    },
    {
      id: '4',
      text: 'Of course! We\'ll make sure the kitchen and bathrooms are spotless. We\'ll also bring eco-friendly cleaning products as requested.',
      sender: 'provider',
      timestamp: new Date(Date.now() - 3300000),
      isRead: true,
    },
    {
      id: '5',
      text: 'Perfect! See you tomorrow then.',
      sender: 'user',
      timestamp: new Date(Date.now() - 3200000),
      isRead: true,
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Mock chat info
  const chatInfo = {
    providerName: 'Clean Pro Services',
    serviceTitle: 'House Cleaning',
    bookingDate: '2024-01-15',
    bookingTime: '10:00 AM',
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
      isRead: false,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate provider response
    setTimeout(() => {
      const responses = [
        'Thanks for the message! I\'ll get back to you soon.',
        'Got it! I\'ll update you shortly.',
        'Noted! I\'ll check and confirm.',
        'Perfect! I\'ll make sure everything is arranged.',
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const providerMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'provider',
        timestamp: new Date(),
        isRead: true,
      };

      setMessages(prev => [...prev, providerMessage]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.providerMessage,
    ]}>
      <View style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.providerBubble,
      ]}>
        <Text style={[
          styles.messageText,
          item.sender === 'user' ? styles.userMessageText : styles.providerMessageText,
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.messageTime,
          item.sender === 'user' ? styles.userMessageTime : styles.providerMessageTime,
        ]}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    </View>
  );

  const handleCallProvider = () => {
    Alert.alert(
      'Call Provider',
      'Would you like to call Clean Pro Services?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => Alert.alert('Info', 'Calling provider...') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.providerName}>{chatInfo.providerName}</Text>
          <Text style={styles.serviceInfo}>{chatInfo.serviceTitle}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.callButton}
          onPress={handleCallProvider}
        >
          <Text style={styles.callButtonText}>📞</Text>
        </TouchableOpacity>
      </View>

      {/* Booking Info */}
      <View style={styles.bookingInfo}>
        <Text style={styles.bookingText}>
          📅 {chatInfo.bookingDate} at {chatInfo.bookingTime}
        </Text>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        style={styles.messagesContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesList}
        />
      </KeyboardAvoidingView>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            !newMessage.trim() && styles.sendButtonDisabled,
          ]}
          onPress={sendMessage}
          disabled={!newMessage.trim()}
        >
          <Text style={[
            styles.sendButtonText,
            !newMessage.trim() && styles.sendButtonTextDisabled,
          ]}>
            Send
          </Text>
        </TouchableOpacity>
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
    padding: 15,
    backgroundColor: '#007AFF',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  serviceInfo: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  callButton: {
    padding: 8,
  },
  callButtonText: {
    fontSize: 20,
  },
  bookingInfo: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  bookingText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    padding: 15,
  },
  messageContainer: {
    marginBottom: 15,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  providerMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  providerBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  userMessageText: {
    color: 'white',
  },
  providerMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 11,
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  providerMessageTime: {
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  sendButtonTextDisabled: {
    color: '#999',
  },
});

export default ChatScreen; 