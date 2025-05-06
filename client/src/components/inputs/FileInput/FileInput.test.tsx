import { render, screen, fireEvent } from '@testing-library/react';
import { FileInput } from './FileInput';
import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';


type InputWrapperProps = { 
  error?: boolean,
  errorText?: string,
};

const InputWrapper = ({ error, errorText }: InputWrapperProps) => {
  const { register, setValue } = useForm();

  return (
    <FileInput 
      name="files"
      error={error}
      helperText={errorText}
      register={register}
      setValue={setValue}
    />
  );
};


describe('FileInput tests', () => {
  it('renders the button with default title', () => {
    render(
      <InputWrapper />
    );
    expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
  });

  it('clicking the button triggers file input click', () => {
    render(
      <InputWrapper />
    );

    const fileInput = screen.getByText(/upload/i) || screen.getByRole('button', { name: /upload/i });
    fireEvent.click(fileInput);
    expect(fileInput).toBeInTheDocument();
  });

  it('renders previews when files are selected', () => {
    render(
      <InputWrapper />
    );

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const input = screen.getByTestId('file-input');
    fireEvent.change(input, { target: { files: [file] } });
    const img = screen.getByAltText('image');

    expect(img).toBeInTheDocument();
  });

  it('shows error text when error and helperText are passed', () => {
    render(
      <InputWrapper error={true} errorText='This field is required' />
    );
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
  });
})