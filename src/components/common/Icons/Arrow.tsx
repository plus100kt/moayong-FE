interface ArrowRightProps {
  width?: number;
  height?: number;
  color?: string;
  variant?: "right" | "left" | "up" | "down";
}
export const Arrow = ({ width = 24, height = 24, variant = "right" }: ArrowRightProps) => {
  const rotate = {
    right: "",
    down: "rotate-90",
    left: "rotate-180",
    up: "rotate-270",
  };
  return (
    <div className={rotate[variant]}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="icon/24">
          <path
            id="Vector 924"
            d="M9 6L15 12L9 18"
            stroke="#798591"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};
