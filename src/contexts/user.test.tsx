// UserContext.test.tsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { UserProvider, useUser } from './UserContext';

const TestComponent = () => {
  const { user, setUser } = useUser();
  return (
    <div>
      <div data-testid="user">{user ? user.name : 'No user'}</div>
      <button onClick={() => setUser({ userId: 1, name: 'Test User' })}>Set User</button>
      <button onClick={() => setUser(null)}>Clear User</button>
    </div>
  );
};

describe('UserContext', () => {
  test('provides default value', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(screen.getByTestId('user').textContent).toBe('No user');
  });

  test('allows updating the user', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    act(() => {
      screen.getByText('Set User').click();
    });

    expect(screen.getByTestId('user').textContent).toBe('Test User');

    act(() => {
      screen.getByText('Clear User').click();
    });

    expect(screen.getByTestId('user').textContent).toBe('No user');
  });

  test('throws error when used outside of UserProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const renderWithoutProvider = () => {
      render(<TestComponent />);
    };

    expect(renderWithoutProvider).toThrow('useUser must be used within a UserProvider');
    
    consoleError.mockRestore();
  });
});
