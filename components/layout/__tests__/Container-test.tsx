/**
 * Unit tests for Container component
 */
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Container } from '../Container';

describe('Container', () => {
  it('renders children in the tree', () => {
    render(
      <Container>
        <Text>Hello from container</Text>
      </Container>
    );
    expect(screen.getByText('Hello from container')).toBeOnTheScreen();
  });

  it('renders multiple children', () => {
    render(
      <Container>
        <Text>First</Text>
        <Text>Second</Text>
      </Container>
    );
    expect(screen.getByText('First')).toBeOnTheScreen();
    expect(screen.getByText('Second')).toBeOnTheScreen();
  });

  it('accepts custom className without throwing', () => {
    render(
      <Container className="custom-class">
        <Text>Content</Text>
      </Container>
    );
    expect(screen.getByText('Content')).toBeOnTheScreen();
  });

  it('accepts custom edges without throwing', () => {
    render(
      <Container edges={['bottom']}>
        <Text>Content</Text>
      </Container>
    );
    expect(screen.getByText('Content')).toBeOnTheScreen();
  });
});
