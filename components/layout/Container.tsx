import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

interface ContainerProps {
  children: React.ReactNode;
  /** Additional className for custom styling */
  className?: string;
  /**
   * Edges to apply safe area insets.
   * Use this to exclude certain edges when navigation headers handle them.
   * @default ['top', 'bottom', 'left', 'right']
   */
  edges?: Edge[];
}

/**
 * Container Component
 *
 * Provides safe area boundaries for the app content.
 * Uses minimal styling to allow child components full control over their appearance.
 *
 * When using with navigation that has headers (like Drawer or Stack),
 * exclude 'top' from edges to avoid double padding.
 */
export const Container = ({
  children,
  className = '',
  edges = ['top', 'bottom', 'left', 'right'],
}: ContainerProps) => {
  return (
    <SafeAreaView edges={edges} className={`flex-1 bg-bg-secondary ${className}`}>
      {children}
    </SafeAreaView>
  );
};
