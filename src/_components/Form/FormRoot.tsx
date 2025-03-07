import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import Button from "../Button";

interface FormField {
  name: string;
  validationRule: z.ZodTypeAny;
}

interface FormRootProps {
  children: React.ReactNode;
  fields: FormField[];
  onSubmit: (values: any) => void;
  defaultValues?: { [key: string]: any };
}

export default function FormRoot({ children, fields, onSubmit, defaultValues = {} }: FormRootProps) {
  const formSchema = z.object(
    fields.reduce((acc, { name, validationRule }) => ({ ...acc, [name]: validationRule }), {})
  );

  const mergedDefaultValues = fields.reduce((acc, { name }) => {
    return { ...acc, [name]: defaultValues[name] || "" }; // Use provided defaultValue or empty string
  }, {});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: mergedDefaultValues,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {children}
        <Button.Default type="submit">제출</Button.Default>
      </form>
    </FormProvider>
  );
}

