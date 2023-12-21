import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomCalendar from './CustomCalendar';

describe('<CustomCalendar />', () => {
  test('it should mount', () => {
    render(<CustomCalendar />);
    
    const customCalendar = screen.getByTestId('CustomCalendar');

    expect(customCalendar).toBeInTheDocument();
  });
});