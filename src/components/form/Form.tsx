import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

type FormProps<T> = {
  form: UseFormReturn<T & FieldValues>;
  onSubmit?: (data: T) => void;
  children: React.ReactNode;
};

export default function Form<T extends FieldValues>({ form, onSubmit = () => null, children }: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
