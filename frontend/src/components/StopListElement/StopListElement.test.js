import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StopListElement from './StopListElement';

describe('<StopListElement />', () => {
    test('it should mount', () => {
        render(<StopListElement/>);

        const stopListElement = screen.getByTestId('StopListElement');

        expect(stopListElement).toBeInTheDocument();
    });
});