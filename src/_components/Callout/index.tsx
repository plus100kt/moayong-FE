import { cn } from "src/_lib/utils";
import { ExclamationMarkIcon } from "src/components/common/Icons";

export const Callout = ({
  children,
  variant = "warning",
}: {
  children: React.ReactNode;
  variant?: "warning" | "info";
}) => {
  const bgColor = {
    warning: "bg-[#FFF9D5]",
    info: "bg-[#F4F5F6]",
  };

  return (
    <div
      className={cn(
        "px-[14px] py-[10px] gap-2 flex items-center rounded-[14px] caption-md text-gray-90 h-[52px]",
        bgColor[variant]
      )}
    >
      <div className="p-1">
        {variant === "warning" && <ExclamationMarkIcon />}
        {variant === "info" && <span className="text-[16px]">📢</span>}
      </div>

      <div>{children}</div>
    </div>
  );
};
