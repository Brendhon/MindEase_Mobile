/**
 * Unit tests for ButtonText component
 */
import { render, screen } from '@testing-library/react-native';
import { ButtonText } from '../ButtonText';

describe('ButtonText', () => {
  it('renders children text', () => {
    render(<ButtonText>Click me</ButtonText>);
    expect(screen.getByText('Click me')).toBeOnTheScreen();
  });

  it('renders with default variant (primary)', () => {
    render(<ButtonText>Submit</ButtonText>);
    expect(screen.getByText('Submit')).toBeOnTheScreen();
  });

  it('renders with secondary variant without throwing', () => {
    render(<ButtonText variant="secondary">Cancel</ButtonText>);
    expect(screen.getByText('Cancel')).toBeOnTheScreen();
  });

  it('renders with danger variant without throwing', () => {
    render(<ButtonText variant="danger">Delete</ButtonText>);
    expect(screen.getByText('Delete')).toBeOnTheScreen();
  });

  it('accepts optional className', () => {
    render(<ButtonText className="custom-class">Label</ButtonText>);
    expect(screen.getByText('Label')).toBeOnTheScreen();
  });
});
