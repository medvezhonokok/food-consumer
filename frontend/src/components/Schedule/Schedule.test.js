import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Schedule from './Schedule';

describe('<Schedule />', () => {
  test('it should mount', () => {
    render(<Schedule />);
    
    const schedule = screen.getByTestId('Schedule');

    expect(schedule).toBeInTheDocument();
  });
});