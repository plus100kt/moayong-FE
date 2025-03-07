"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "src/lib/utils";

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  size?: "sm" | "md" | "lg";
  defaultColor?: string; // 체크되기 전 색상
  checkedColor?: string; // 체크됐을 때 색상
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6", // 24px
  lg: "w-8 h-8",
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      size = "md",
      defaultColor = "bg-gray-10", // 체크 전 기본 색상
      checkedColor = "bg-green-60", // 체크된 후 색상
      ...props
    },
    ref
  ) => {
    // 체크 상태를 추적하는 로컬 상태
    const [checked, setChecked] = React.useState(props.checked || props.defaultChecked || false);

    // 부모 컴포넌트에서 checked prop이 변경될 때 로컬 상태도 업데이트
    React.useEffect(() => {
      if (props.checked !== undefined) {
        setChecked(props.checked);
      }
    }, [props.checked]);

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer shrink-0 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed",
          sizeClasses[size],
          // 체크 상태에 따라 조건부로 색상 적용
          checked ? checkedColor : defaultColor,
          className
        )}
        onCheckedChange={(state) => {
          setChecked(!!state);
          if (props.onCheckedChange) {
            props.onCheckedChange(state);
          }
        }}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-gray-0">
          <Check className="w-[17px] h-[17px]" style={{ strokeWidth: 3 }} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };