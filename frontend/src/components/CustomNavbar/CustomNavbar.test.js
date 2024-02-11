import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomNavbar from './CustomNavbar';

describe('<CustomNavbar />', () => {
    test('it should mount', () => {
        render(<CustomNavbar/>);

        const customNavbar = screen.getByTestId('CustomNavbar');

        expect(customNavbar).toBeInTheDocument();
    });
});