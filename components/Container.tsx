import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView className={styles.container}>
    <View className={styles.content}>
      {children}
    </View>
  </SafeAreaView>;
};

const styles = {
  container: 'flex flex-1 m-6',
  content: 'flex-1 bg-action-primary rounded-lg p-6',
};
