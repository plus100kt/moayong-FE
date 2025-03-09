"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "src/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    {/* Track의 색상: 비어있는 슬라이더 바 색상은 E5E5E5 */}
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[#E5E5E5]">
      {/* Range의 색상: 슬라이더가 이동한 부분의 색상은 green-50 */}
      <SliderPrimitive.Range className="absolute h-full bg-green-50" />
    </SliderPrimitive.Track>

    {/* Thumb의 크기와 색상 설정 */}
    <SliderPrimitive.Thumb
      className="block h-[28px] w-[28px] rounded-full bg-gray-0 shadow-[0px_4px_14px_#B1B8BE] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderPrimitive.Root>
))

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
