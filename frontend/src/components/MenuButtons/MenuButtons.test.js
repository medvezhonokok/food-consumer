import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MenuButtons from './MenuButtons';

describe('<MenuButtons />', () => {
  test('it should mount', () => {
    render(<MenuButtons />);
    
    const menuButtons = screen.getByTestId('MenuButtons');

    expect(menuButtons).toBeInTheDocument();
  });
});