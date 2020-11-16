import React from 'react';
import {render} from '@testing-library/react';
import Home from './index';

test('renders page', () => {
    const {container, getByTestId} = render(<Home/>);
    expect(container).toBeDefined();

    const searchElement = getByTestId(/search-input/i);
    expect(searchElement).toBeInTheDocument();

    const statusElement = getByTestId(/status-input/i);
    expect(statusElement).toBeInTheDocument();

    const tableElement = getByTestId(/table-transaction/i);
    expect(tableElement).toBeInTheDocument();

    const thTitle = getByTestId(/th-title/i);
    expect(thTitle).toBeInTheDocument();

    const thDescription = getByTestId(/th-description/i);
    expect(thDescription).toBeInTheDocument();

    const thStatus = getByTestId(/th-status/i);
    expect(thStatus).toBeInTheDocument();

    const thAmount = getByTestId(/th-amount/i);
    expect(thAmount).toBeInTheDocument();
});

