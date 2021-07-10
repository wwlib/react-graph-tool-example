import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Model from './model/Model';

test('renders learn react link', () => {
  const appModel = new Model();
  render(<App appModel={appModel}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
