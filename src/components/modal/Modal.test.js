import { render } from '@testing-library/react';
import Modal from './Modal';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

describe('<Modal />', () => {
  const config = { visible: true, callback: jest.fn() };

  test('modalType="confirm"', async () => {
    const confirmModal = {
      ...config,
      modalType: 'confirm',
      message: 'confirm 창',
    };
    const { findByText } = render(<Modal {...confirmModal} />);
    const result = await findByText('confirm 창');
    // expect(getByText('')).toContainElement(getByText(/portal content/i));
    expect(result).toBeInTheDocument();
  });

  test('modalType="progress"', async () => {
    const progressModal = {
      ...config,
      modalType: 'progress',
      message: 'progress 모달',
    };
    const { findByText } = render(<Modal {...progressModal} />);
    const result = await findByText('progress 모달');
    // expect(getByText('')).toContainElement(getByText(/portal content/i));
    expect(result).toBeInTheDocument();
  });
});
