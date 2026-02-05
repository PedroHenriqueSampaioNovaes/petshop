import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './index';
import userRegister from '@/app/actions/user-register';
import login from '@/app/actions/login';
import { useAuthModal } from '@/src/context/AuthModalContext';

jest.mock('@/app/actions/user-register', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/app/actions/login', () => ({
  __esModule: true,
  default: jest.fn(),
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

jest.mock('use-mask-input', () => ({
  useHookFormMask: (register: any) => (name: string) => register(name),
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
  MdOutlinePhone: () => <span data-testid="icon-phone" />,
  MdOutlineVpnKey: () => <span data-testid="icon-key" />,
  MdPersonOutline: () => <span data-testid="icon-person" />,
}));

describe('Register Component', () => {
  const mockSetOpenModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthModal as jest.Mock).mockReturnValue({
      openModal: 'register',
      setOpenModal: mockSetOpenModal,
    });
  });

  it('should render correctly when modal is open', () => {
    render(<Register />);

    expect(
      screen.getByRole('dialog', { name: 'Crie sua conta' }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Telefone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirmar senha')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Cadastrar' }),
    ).toBeInTheDocument();
  });

  it('should not show submission errors initially', () => {
    render(<Register />);

    expect(
      screen.queryByText('Mínimo de 2 caracteres'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('E-mail inválido')).not.toBeInTheDocument();
    expect(screen.queryByText('Telefone inválido')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Mínimo de 6 caracteres'),
    ).not.toBeInTheDocument();
  });

  it('should validate empty fields on submit', async () => {
    render(<Register />);

    const submitBtn = screen.getByRole('button', { name: 'Cadastrar' });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Mínimo de 2 caracteres')).toBeInTheDocument();
      expect(screen.queryByText('Telefone inválido')).toBeInTheDocument();
      expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
      expect(screen.getByText('Mínimo de 6 caracteres')).toBeInTheDocument();
    });

    expect(userRegister).not.toHaveBeenCalled();
  });

  it('should validate password mismatch', async () => {
    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: '123456' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar senha'), {
      target: { value: '654321' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitFor(() => {
      expect(screen.getByText('As senhas não coincidem')).toBeInTheDocument();
    });

    expect(userRegister).not.toHaveBeenCalled();
  });

  it('should validate invalid phone format', async () => {
    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Telefone'), {
      target: { value: '11 9999' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitFor(() => {
      expect(screen.getByText('Telefone inválido')).toBeInTheDocument();
    });
  });

  it('should call userRegister and login on successful registration', async () => {
    const mockRegisterData = {
      name: 'Test User',
      phone: '11 99999-9999',
      email: 'test@example.com',
      password: 'password123',
      confirm: 'password123',
    };

    (userRegister as jest.Mock).mockResolvedValue({
      ok: true,
      data: { email: mockRegisterData.email },
    });
    (login as jest.Mock).mockResolvedValue({ ok: true });

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: mockRegisterData.name },
    });
    fireEvent.change(screen.getByPlaceholderText('Telefone'), {
      target: { value: mockRegisterData.phone },
    });
    fireEvent.change(screen.getByPlaceholderText('E-mail'), {
      target: { value: mockRegisterData.email },
    });
    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: mockRegisterData.password },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar senha'), {
      target: { value: mockRegisterData.confirm },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitFor(() => {
      expect(userRegister).toHaveBeenCalledWith(mockRegisterData);
      expect(login).toHaveBeenCalledWith({
        email: mockRegisterData.email,
        password: mockRegisterData.password,
      });
    });
  });

  it('should handle registration error', async () => {
    (userRegister as jest.Mock).mockResolvedValue({
      ok: false,
      error: 'Erro ao cadastrar',
    });
    const toastError = require('react-hot-toast').error;

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByPlaceholderText('Telefone'), {
      target: { value: '11 99999-9999' },
    });
    fireEvent.change(screen.getByPlaceholderText('E-mail'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar senha'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitFor(() => {
      expect(userRegister).toHaveBeenCalled();
      expect(login).not.toHaveBeenCalled();
      expect(toastError).toHaveBeenCalledWith('Erro ao cadastrar');
    });
  });

  it('should handle login error after successful registration', async () => {
    (userRegister as jest.Mock).mockResolvedValue({
      ok: true,
      data: { email: 'test@example.com' },
    });
    (login as jest.Mock).mockResolvedValue({
      ok: false,
      error: 'Erro ao logar',
    });
    const toastError = require('react-hot-toast').error;

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByPlaceholderText('Telefone'), {
      target: { value: '11 99999-9999' },
    });
    fireEvent.change(screen.getByPlaceholderText('E-mail'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar senha'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitFor(() => {
      expect(userRegister).toHaveBeenCalled();
      expect(login).toHaveBeenCalled();
      expect(toastError).toHaveBeenCalledWith('Erro ao logar');
    });
  });

  it('should switch to login modal when "Clique aqui" is clicked', () => {
    render(<Register />);

    const loginBtn = screen.getByText('Clique aqui');
    fireEvent.click(loginBtn);

    expect(mockSetOpenModal).toHaveBeenCalledWith('login');
  });
});
