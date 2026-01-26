import { Field } from '@base-ui/react';

interface FieldErrorProps {
  error?: string;
}

export default function FieldError({ error }: FieldErrorProps) {
  return (
    <Field.Error className="text-sm text-red-800 mt-0.5" match={true}>
      {error}
    </Field.Error>
  );
}
