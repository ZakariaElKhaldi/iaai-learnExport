import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginForm, LoginFormProps } from '../LoginForm'; // Adjust path as necessary

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

const mockOnSubmit = jest.fn();

const defaultProps: LoginFormProps = {
  onSubmit: mockOnSubmit,
  isLoading: false,
  error: null,
  showRegisterLink: true,
  showSocialLogin: false,
};

describe('LoginForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders correctly with email and password fields', () => {
    render(<LoginForm {...defaultProps} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    render(<LoginForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('allows user to type into email and password fields', () => {
    render(<LoginForm {...defaultProps} />);

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('calls onSubmit with form values when submitted with valid data', async () => {
    render(<LoginForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false, // Default value
      });
    });
  });

  it('displays validation error for invalid email', async () => {
    render(<LoginForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('displays validation error for short password', async () => {
    render(<LoginForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows loading state when isLoading is true', () => {
    render(<LoginForm {...defaultProps} isLoading={true} />);
    expect(screen.getByRole('button', { name: /signing in.../i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /signing in.../i })).toBeDisabled();
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'Invalid credentials';
    render(<LoginForm {...defaultProps} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    render(<LoginForm {...defaultProps} />);
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    const toggleButton = screen.getByRole('button', { name: /show password/i });

    expect(passwordInput.type).toBe('password');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });
  
  it('shows register link by default', () => {
    render(<LoginForm {...defaultProps} />);
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute('href', '/auth/register');
  });

  it('hides register link when showRegisterLink is false', () => {
    render(<LoginForm {...defaultProps} showRegisterLink={false} />);
    expect(screen.queryByText(/don't have an account\?/i)).not.toBeInTheDocument();
  });

  it('shows social login buttons when showSocialLogin is true', () => {
    render(<LoginForm {...defaultProps} showSocialLogin={true} />);
    expect(screen.getByText(/or continue with/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /microsoft/i })).toBeInTheDocument();
  });

  it('hides social login buttons by default', () => {
    render(<LoginForm {...defaultProps} />);
    expect(screen.queryByText(/or continue with/i)).not.toBeInTheDocument();
  });

  it('renders logo when provided', () => {
    const logoText = "My Awesome Logo";
    render(<LoginForm {...defaultProps} logo={<span>{logoText}</span>} />);
    expect(screen.getByText(logoText)).toBeInTheDocument();
  });
});
