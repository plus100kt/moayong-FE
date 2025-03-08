import Button from 'src/_components/Button';
import IconCamera from 'src/assets/icon-camera';

interface IconProps {
  children?: React.ReactNode;
  disabled?: boolean
  onClick?: () => void;
}

const Icon = ({ children, disabled = false, onClick }: IconProps) => {
  return (
    <Button.Default variant="default" size={'large'} className='label-md' disabled={disabled} onClick={onClick}>
      <div className="bg-gray-40">
        <IconCamera width={32} height={32} />
      </div>
      {children}
    </Button.Default>
  )
}

export default Icon;