import { render, screen } from '@testing-library/react';
import App from './App';

test('Renderiza el componente principal', () => {
  render(<App />);
  const title = screen.getByText(/Cinema Page/i); // Ajusta el texto según tu app
  expect(title).toBeInTheDocument();
});
