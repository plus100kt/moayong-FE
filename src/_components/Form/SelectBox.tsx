// FormSelect.tsx
import { useFormContext, Controller } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormMessage } from "src/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  placeholder: string;
  options: Option[];
}

function FormSelect({ name, label, placeholder, options }: FormSelectProps) {
  const { control, formState: { errors } } = useFormContext();

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        )}
      />
      <FormMessage>{errors[name]?.message?.toString()}</FormMessage>
    </FormItem>
  );
}

export default FormSelect;
