import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ScheduleBox from './ScheduleBox';

describe('<ScheduleBox />', () => {
  test('it should mount', () => {
    render(<ScheduleBox />);
    
    const scheduleBox = screen.getByTestId('ScheduleBox');

    expect(scheduleBox).toBeInTheDocument();
  });
});