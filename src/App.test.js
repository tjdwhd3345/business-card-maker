import { render } from '@testing-library/react';
import App from './App';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

describe('<App />', () => {
  test('run', () => {
    render(<App />);
  });
});
