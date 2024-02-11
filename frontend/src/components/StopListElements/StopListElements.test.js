import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StopListElements from './StopListElements';

describe('<StopListElements />', () => {
    test('it should mount', () => {
        render(<StopListElements/>);

        const stopListElements = screen.getByTestId('StopListElements');

        expect(stopListElements).toBeInTheDocument();
    });
});