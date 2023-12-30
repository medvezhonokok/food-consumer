import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MenuButton from './MenuButton';

describe('<MenuButton />', () => {
  test('it should mount', () => {
    render(<MenuButton />);
    
    const menuButton = screen.getByTestId('MenuButton');

    expect(menuButton).toBeInTheDocument();
  });
});