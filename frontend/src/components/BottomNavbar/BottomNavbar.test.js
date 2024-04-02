import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BottomNavbar from './BottomNavbar';

describe('<BottomNavbar />', () => {
  test('it should mount', () => {
    render(<BottomNavbar />);
    
    const bottomNavbar = screen.getByTestId('BottomNavbar');

    expect(bottomNavbar).toBeInTheDocument();
  });
});