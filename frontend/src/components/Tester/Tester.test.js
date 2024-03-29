import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tester from './Tester';

describe('<Tester />', () => {
  test('it should mount', () => {
    render(<Tester />);
    
    const tester = screen.getByTestId('Tester');

    expect(tester).toBeInTheDocument();
  });
});