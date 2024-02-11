import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tasks from './Tasks';

describe('<Tasks />', () => {
    test('it should mount', () => {
        render(<Tasks/>);

        const tasks = screen.getByTestId('Tasks');

        expect(tasks).toBeInTheDocument();
    });
});