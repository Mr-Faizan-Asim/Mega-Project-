import { render, screen } from '@testing-library/react';
import Chat from './Chat.jsx';
import { AuthContext } from '../state/AuthContext.jsx';

// Utility wrapper to provide a dummy authentication context
function renderWithAuth(ui, { token = 'testToken' } = {}) {
  return render(
    <AuthContext.Provider value={{ token }}>
      {ui}
    </AuthContext.Provider>
  );
}

test('renders chat heading', () => {
  renderWithAuth(<Chat />);
  const heading = screen.getByRole('heading', { name: /chat with mega planner/i });
  expect(heading).toBeInTheDocument();
});