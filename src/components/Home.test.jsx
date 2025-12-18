import { render, screen } from '@testing-library/react';
import Home from './Home.jsx';

test('renders welcome message', () => {
  render(<Home />);
  const heading = screen.getByRole('heading', { name: /welcome to mega planner/i });
  expect(heading).toBeInTheDocument();
});