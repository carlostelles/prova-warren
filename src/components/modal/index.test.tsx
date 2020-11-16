import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from "./index";

test('renders modal', () => {
  render(<Modal title="Título modal" show={true}>Conteúdo</Modal>);
  const title = screen.getByText(/título modal/i);
  const conteudo = screen.getByText(/conteúdo/i);
  expect(title).toBeInTheDocument();
  expect(conteudo).toBeInTheDocument();
});
