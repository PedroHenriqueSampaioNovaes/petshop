import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PetForm from './index';
import { FormProvider, useForm } from 'react-hook-form';

jest.mock('./Preview', () => ({
  __esModule: true,
  default: () => <div data-testid="preview-mock">Preview Component</div>,
}));

jest.mock('./MunicipalityField', () => ({
  __esModule: true,
  default: () => <div data-testid="municipality-mock">Municipality Field</div>,
}));

jest.mock('../Forms/ComboboxField', () => ({
  __esModule: true,
  default: ({ label, name, options }: any) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <select data-testid={`select-${name}`} name={name} id={name}>
        {options?.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

const renderPetForm = (props: any = {}) => {
  const Wrapper = ({ children }: any) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  const defaultProps = {
    onSubmit: jest.fn((e) => e.preventDefault()),
    stateOptions: [{ value: 'SP', label: 'São Paulo' }],
    callToAction: 'Salvar',
    ...props,
  };

  return {
    ...render(
      <Wrapper>
        <PetForm {...defaultProps} />
      </Wrapper>,
    ),
    props: defaultProps,
  };
};

describe('PetForm Component', () => {
  it('should render all form fields correctly', () => {
    renderPetForm();

    expect(screen.getByText('Imagens do Pet:')).toBeInTheDocument();
    expect(screen.getByText('Nome do Pet:')).toBeInTheDocument();
    expect(screen.getByText('Idade do Pet:')).toBeInTheDocument();
    expect(screen.getByText('Peso do Pet:')).toBeInTheDocument();
    expect(screen.getByText('Raça do Pet:')).toBeInTheDocument();
    expect(screen.getByLabelText('Selecione o gênero:')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Selecione o status da castração:'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Selecione o estado:')).toBeInTheDocument();
    expect(screen.getByText('Descrição do Pet:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument();

    expect(screen.getByTestId('preview-mock')).toBeInTheDocument();
    expect(screen.getByTestId('municipality-mock')).toBeInTheDocument();
  });

  it('should call onSubmit when form is submitted', async () => {
    const onSubmitMock = jest.fn((e) => e.preventDefault());
    renderPetForm({ onSubmit: onSubmitMock });

    const submitButton = screen.getByRole('button', { name: 'Salvar' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });

  it('should render state options in combobox', () => {
    const stateOptions = [
      { value: 'SP', label: 'São Paulo' },
      { value: 'RJ', label: 'Rio de Janeiro' },
    ];
    renderPetForm({ stateOptions });

    const stateSelect = screen.getByTestId('select-state');
    expect(stateSelect).toBeInTheDocument();
    expect(screen.getByText('São Paulo')).toBeInTheDocument();
    expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
  });

  it('should display call to action text on button', () => {
    renderPetForm({ callToAction: 'Cadastrar Pet' });
    expect(
      screen.getByRole('button', { name: 'Cadastrar Pet' }),
    ).toBeInTheDocument();
  });
});
