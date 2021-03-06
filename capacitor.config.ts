import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'superaweomsetest',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorSQLite: {
      iosKeychainPrefix: 'superaweomsetest',
      iosBiometric: {
        biometricAuth: true,
        biometricTitle : "Biometric login for capacitor sqlite",
      },
      androidBiometric: {
        biometricAuth : true,
        biometricTitle : "Biometric login for capacitor sqlite",
        biometricSubTitle : "Log in using your biometric"
      }
    }
  }
};

export default config;
