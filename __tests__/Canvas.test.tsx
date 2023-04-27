import { render, screen } from '@testing-library/react'

import Canvas from '../components/Canvas';

test('renders canvas with correct width and height', () => {
  render(<Canvas />);
  const canvas = screen.getByRole('canvas');
  expect(canvas).toHaveAttribute('width', '543px');
  expect(canvas).toHaveAttribute('height', '305px');
});