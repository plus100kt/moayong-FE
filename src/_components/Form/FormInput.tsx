import { FormItem, FormLabel, FormControl, FormMessage } from "src/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "src/components/ui/input";
import { cn } from "src/lib/utils";

function FormInput({ name, placeholder }: { name: string; placeholder: string }) {
  const {
    register,
    formState: { errors }, // formState에서 errors를 가져옴
  } = useFormContext();

  const error = errors[name];

  return (
    <FormItem>
      <FormLabel className={cn(error ? "text-danger" : "text-green-70")}>
        {placeholder}</FormLabel>
      <FormControl>
        <Input {...register(name)} placeholder={placeholder} className={cn(error ? "border-red-50" : "border-green-50")}
        />
      </FormControl>
      {/* errors 객체에서 해당 필드의 에러 메시지를 가져옴 */}
      <FormMessage className={cn(error ? "text-danger" : "")}>
        {error?.message?.toString()}
      </FormMessage>
    </FormItem>
  );
}

export default FormInput;