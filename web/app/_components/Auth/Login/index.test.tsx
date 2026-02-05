import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './index';
import login from '@/app/actions/login';
import { useAuthModal } from '@/src/context/AuthModalContext';
import { usePathname } from 'next/navigation';

jest.mock('@/app/actions/login', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}));

jest.mock('@/src/context/AuthModalContext', () => ({
  useAuthModal: jest.fn(),
}));

jest.mock('../AuthDialog', () => {
  return ({
    children,
    handleSubmit,
    title,
    submitText,
    buttonIsDisabled,
    ActionLinkMessage,
  }: any) => (
    <div role="dialog" aria-label={title}>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {children}
        <button type="submit" disabled={buttonIsDisabled}>
          {submitText}
        </button>
      </form>
      {ActionLinkMessage}
    </div>
  );
});

jest.mock('react-icons/md', () => ({
  MdOutlineEmail: () => <span data-testid="icon-email" />,
  MdOutlineVpnKey: () => <span data-testid="icon-key" />,
  MdOutlineVisibility: () => <span data-testid="icon-visibility" />,
  MdOutlineVisibilityOff: () => <span data-testid="icon-visibility-off" />,
}));

describe('Login Component', () => {
  const mockSetOpenModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthModal as jest.Mock).mockReturnValue({
      openModal: 'login',
      setOpenModal: mockSetOpenModal,
    });

    (usePathname as jest.Mock).mockReturnValue('/home');
  });

  it('should render correctly when modal is open', () => {
    render(<Login />);

    expect(
      screen.getByRole('dialog', { name: 'Entre no Adopt a Pet' }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('should not show submission errors initially', () => {
    render(<Login />);

    expect(screen.queryByText('E-mail inválido')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Mínimo de 6 caracteres'),
    ).not.toBeInTheDocument();
  });

  it('should validate empty fields on submit', async () => {
    render(<Login />);

    const submitBtn = screen.getByRole('button', { name: 'Entrar' });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
      expect(screen.getByText('Mínimo de 6 caracteres')).toBeInTheDocument();
    });

    expect(login).not.toHaveBeenCalled();
  });

  it('should validate invalid email format', async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('E-mail'), {
      target: { value: 'test@t' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() => {
      expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
    });

    expect(login).not.toHaveBeenCalled();
  });

  it('should validate short password', async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: '12345' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() => {
      expect(screen.getByText('Mínimo de 6 caracteres')).toBeInTheDocument();
    });

    expect(login).not.toHaveBeenCalled();
  });

  it('should call login action with correct data on successful submit', async () => {
    (login as jest.Mock).mockResolvedValue({ ok: true });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('E-mail'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: '123456' },
    });

    const submitBtn = screen.getByRole('button', { name: 'Entrar' });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: '123456',
      });
    });
  });

  it('should handle login error', async () => {
    (login as jest.Mock).mockResolvedValue({
      ok: false,
      error: 'Credenciais inválidas',
    });
    const toastError = require('react-hot-toast').error;

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('E-mail'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() => {
      expect(login).toHaveBeenCalled();
      expect(toastError).toHaveBeenCalledWith('Credenciais inválidas');
    });
  });

  it('should disable submit button while submitting', async () => {
    // Delay resolution to check disabled state
    (login as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100)),
    );

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('E-mail'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: '123456' },
    });

    const submitBtn = screen.getByRole('button', { name: 'Entrar' });
    fireEvent.click(submitBtn);

    expect(submitBtn).toBeDisabled();

    await waitFor(() => {
      expect(login).toHaveBeenCalled();
    });
  });

  it('should switch to register modal when "Clique aqui" is clicked', () => {
    render(<Login />);

    const registerBtn = screen.getByText('Clique aqui');
    fireEvent.click(registerBtn);

    expect(mockSetOpenModal).toHaveBeenCalledWith('register');
  });
});
