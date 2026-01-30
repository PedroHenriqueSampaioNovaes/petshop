import { Field } from '@base-ui/react/field';

interface FieldLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function FieldLabel({ className, children }: FieldLabelProps) {
  return <Field.Label className={className}>{children}</Field.Label>;
}
