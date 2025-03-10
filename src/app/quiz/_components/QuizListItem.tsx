import { Arrow } from "src/components/common/Icons/Arrow";

interface QuizListItemProps {
  text: string;
  onClick: () => void;
}

export const QuizListItem = ({ text, onClick }: QuizListItemProps) => {
  return (
    <li className="h-[52px] flex items-center justify-between cursor-pointer" onClick={onClick}>
      <p className="">{text}</p>
      <span>
        <Arrow variant="right" />
      </span>
    </li>
  );
};
