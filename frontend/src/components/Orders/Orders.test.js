import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Orders from './Orders';

describe('<Orders />', () => {
    test('it should mount', () => {
        render(<Orders/>);

        const notes = screen.getByTestId('Notes');

        expect(notes).toBeInTheDocument();
    });
});