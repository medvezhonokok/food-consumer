import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderList from './OrderList';

describe('<OrderList />', () => {
    test('it should mount', () => {
        render(<OrderList/>);

        const orders = screen.getByTestId('OrderList');

        expect(orders).toBeInTheDocument();
    });
});