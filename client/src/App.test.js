import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Find Ideal Recipe's for You/i);
  expect(linkElement).toBeInTheDocument();
});
