# HandiGO

HandiGO is a local services marketplace app that connects users with trusted professionals for a variety of tasks and services in their area. Built with Expo/React Native, HandiGO offers a secure, user-friendly experience with multi-language support, dark mode, analytics, and integrated payments.

## Features
- Browse and book local service providers
- Secure payment integration
- Multi-language support
- Dark mode
- Analytics dashboard
- Secure storage for sensitive data
- Modern, responsive UI

## Getting Started

### Prerequisites
- Node.js & npm
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)

### Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:Jtorres160/HandiGO.git
   cd HandiGO
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```

## Building for Production
1. Log in to Expo:
   ```bash
   eas login
   ```
2. Configure EAS build:
   ```bash
   eas build:configure
   ```
3. Build for Android:
   ```bash
   eas build -p android --profile production
   ```

## License
This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

## Privacy Policy
Read our privacy policy here: [https://jtorres160.github.io/HandiGO/](https://jtorres160.github.io/HandiGO/) 