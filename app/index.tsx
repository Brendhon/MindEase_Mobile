import { useTextDetail } from '@/hooks/accessibility';
import { useAuth } from '@/hooks/auth';
import { PAGE_ROUTES, PROTECTED_ROUTES } from '@/utils/routes';
import { THEME_COLORS } from '@/utils/theme';
import { Image } from 'expo-image';
import { Redirect } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

/** App icon with pulsing scale animation for splash-style loading */
function LoadingSplash() {
  const { getText } = useTextDetail();
  const pulse = useRef(new Animated.Value(1)).current;
  const duration = 600;
  const difference = 0.2;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1 + difference,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  return (
    <View style={[styles.container, { backgroundColor: THEME_COLORS.bgSecondary }]}>
      <Animated.View style={{ transform: [{ scale: pulse }] }}>
        <Image
          source={require('../assets/icon.png')}
          style={styles.icon}
          contentFit="contain"
          accessibilityLabel={getText('loading')}
        />
      </Animated.View>
    </View>
  );
}

/**
 * Home page - Entry point of the application
 *
 * Redirects to login screen if user is not authenticated.
 * Redirects to dashboard if user is authenticated.
 * Shows a loading state while checking authentication.
 */
export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSplash />;
  }

  return isAuthenticated ? (
    <Redirect href={PROTECTED_ROUTES.DASHBOARD} />
  ) : (
    <Redirect href={PAGE_ROUTES.LOGIN} />
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  icon: {
    width: 125,
    height: 125,
    borderRadius: 250,
    borderWidth: 2,
    borderColor: THEME_COLORS.borderStrong,
  },
};
