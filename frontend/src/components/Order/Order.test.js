import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Order from './Order';

describe('<Order />', () => {
  test('it should mount', () => {
    render(<Order />);
    
    const order = screen.getByTestId('Order');

    expect(order).toBeInTheDocument();
  });
});