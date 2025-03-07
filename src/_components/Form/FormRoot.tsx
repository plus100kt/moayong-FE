import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import Button from "../Button";

// Zod validation 스키마 정의
// const formSchema = z.object({
//   name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다."),
//   bio: z.string().min(10, "자기소개는 최소 10글자 이상이어야 합니다.").max(160, "자기소개는 최대 160글자까지 가능합니다."),
//   role: z.string().nonempty("역할을 선택해주세요"),
//   terms: z.boolean().refine(val => val === true, {
//     message: "약관에 동의해주세요",
//   }),
// });

interface FormField {
  name: string;
  validationRule: z.ZodString;
}

interface FormRootProps {
  children: React.ReactNode;
  fields: FormField[];
  onSubmit: (values: any) => void;
}

export default function FormRoot({ children, fields, onSubmit }: FormRootProps) {
  const formSchema = z.object(
    fields.reduce((acc, { name, validationRule }) => ({ ...acc, [name]: validationRule }), {})
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      role: "",
      terms: false,
    },
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

