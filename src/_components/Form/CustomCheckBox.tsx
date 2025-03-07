import { useFormContext, Controller } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormMessage } from "src/components/ui/form";
import { Checkbox } from "src/components/ui/checkbox";
import { cn } from "src/lib/utils";

interface CustomCheckBoxProps {
  name: string;
  label: React.ReactNode;
  size?: "sm" | "md" | "lg";
  defaultColor?: string;
  checkedColor?: string;
}

export function CustomCheckBox({
  name,
  label,
  size = "md",
  checkedColor = "bg-green-60",
  defaultColor = "bg-gray-10",
}: CustomCheckBoxProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const checkboxId = `${name}-checkbox`;

  return (
    <FormItem className="inline-flex items-center">
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div
              className={cn(
                "border rounded-[16px] flex gap-[33px] items-center",
              )}
              style={{
                border: field.value ? "1px solid #12B76A" : "1px solid #E6E8EA",
                padding: "18px 18px 18px 16px",
              }}
            >
              <FormLabel htmlFor={checkboxId} className="cursor-pointer">
                {label}
              </FormLabel>
              <Checkbox
                id={checkboxId}
                checked={field.value}
                onCheckedChange={field.onChange}
                size={size}
                checkedColor={checkedColor}
                defaultColor={defaultColor}
              />
            </div>
          )}
        />
      </FormControl>
      {/* <FormMessage>{errors[name]?.message?.toString()}</FormMessage> */}
    </FormItem>
  );
}

export default CustomCheckBox;
