import React from 'react';
import { render } from '@testing-library/react';
import Console from './components/Console';

test('renders learn react link', () => {
  const { getByText } = render(<Console />);
  // @TODO: test ``Console`` component 
});
