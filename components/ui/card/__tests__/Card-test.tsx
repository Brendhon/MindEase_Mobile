/**
 * Unit tests for Card and Card subcomponents
 * Mocks useAccessibilityClasses and useCognitiveSettings so components render with stable values.
 */
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from '../Card';

jest.mock('@/hooks/accessibility', () => ({
  useAccessibilityClasses: () => ({
    fontSizeClasses: { xs: 'text-xs', sm: 'text-sm', base: 'text-base', lg: 'text-lg', xl: 'text-xl' },
    spacingClasses: { gap: 'gap-2', padding: 'p-4' },
    contrastClasses: 'contrast-class',
  }),
}));

jest.mock('@/hooks/cognitive-settings', () => ({
  useCognitiveSettings: () => ({
    settings: { contrast: 'normal' as const },
  }),
}));

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <Text>Card content</Text>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeOnTheScreen();
  });

  it('accepts testID and exposes it on the root View', () => {
    render(
      <Card testID="my-card">
        <Text>Content</Text>
      </Card>
    );
    expect(screen.getByTestId('my-card')).toBeOnTheScreen();
    expect(screen.getByText('Content')).toBeOnTheScreen();
  });

  it('accepts custom className without throwing', () => {
    render(
      <Card className="custom-card">
        <Text>Content</Text>
      </Card>
    );
    expect(screen.getByText('Content')).toBeOnTheScreen();
  });

  it('renders with focused prop without throwing', () => {
    render(
      <Card focused>
        <Text>Focused content</Text>
      </Card>
    );
    expect(screen.getByText('Focused content')).toBeOnTheScreen();
  });
});

describe('Card.Title', () => {
  it('renders title text', () => {
    render(<Card.Title>My Title</Card.Title>);
    expect(screen.getByText('My Title')).toBeOnTheScreen();
  });

  it('accepts testID', () => {
    render(<Card.Title testID="card-title">Title</Card.Title>);
    expect(screen.getByTestId('card-title')).toBeOnTheScreen();
  });

  it('accepts optional className', () => {
    render(<Card.Title className="custom">Title</Card.Title>);
    expect(screen.getByText('Title')).toBeOnTheScreen();
  });
});

describe('Card.Content', () => {
  it('renders content children', () => {
    render(
      <Card.Content>
        <Text>Content here</Text>
      </Card.Content>
    );
    expect(screen.getByText('Content here')).toBeOnTheScreen();
  });

  it('accepts testID', () => {
    render(
      <Card.Content testID="card-content">
        <Text>Content</Text>
      </Card.Content>
    );
    expect(screen.getByTestId('card-content')).toBeOnTheScreen();
  });

  it('accepts optional className', () => {
    render(
      <Card.Content className="custom">
        <Text>Content</Text>
      </Card.Content>
    );
    expect(screen.getByText('Content')).toBeOnTheScreen();
  });
});

describe('Card.Header', () => {
  it('renders header children', () => {
    render(
      <Card.Header>
        <Text>Header content</Text>
      </Card.Header>
    );
    expect(screen.getByText('Header content')).toBeOnTheScreen();
  });

  it('accepts testID', () => {
    render(
      <Card.Header testID="card-header">
        <Text>Header</Text>
      </Card.Header>
    );
    expect(screen.getByTestId('card-header')).toBeOnTheScreen();
  });
});

describe('Card.Description', () => {
  it('renders description text', () => {
    render(<Card.Description>Description text</Card.Description>);
    expect(screen.getByText('Description text')).toBeOnTheScreen();
  });

  it('accepts testID', () => {
    render(<Card.Description testID="card-desc">Desc</Card.Description>);
    expect(screen.getByTestId('card-desc')).toBeOnTheScreen();
  });
});

describe('Card composition', () => {
  it('renders full card with Header, Title, Description and Content', () => {
    render(
      <Card testID="full-card">
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
          <Card.Description>Card description</Card.Description>
        </Card.Header>
        <Card.Content>
          <Text>Body content</Text>
        </Card.Content>
      </Card>
    );
    expect(screen.getByTestId('full-card')).toBeOnTheScreen();
    expect(screen.getByText('Card Title')).toBeOnTheScreen();
    expect(screen.getByText('Card description')).toBeOnTheScreen();
    expect(screen.getByText('Body content')).toBeOnTheScreen();
  });
});
