import { FormItem, FormLabel, FormControl, FormMessage } from "src/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "src/components/ui/input";

function FormInput({ name, placeholder }: { name: string; placeholder: string }) {
  const {
    register,
    formState: { errors }, // formState에서 errors를 가져옴
  } = useFormContext();

  return (
    <FormItem>
      <FormLabel>{placeholder}</FormLabel> {/* Placeholder를 레이블로 사용 */}
      <FormControl>
        <Input {...register(name)} placeholder={placeholder} />
      </FormControl>
      {/* errors 객체에서 해당 필드의 에러 메시지를 가져옴 */}
      <FormMessage>{errors[name]?.message?.toString()}</FormMessage>
    </FormItem>
  );
}

export default FormInput;