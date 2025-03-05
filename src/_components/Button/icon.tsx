import Image from 'next/image';
import Button from 'src/_components/Button';
import iconCamera from 'src/assets/icon-camera.svg';

interface IconProps {
  children?: React.ReactNode;
}

const Icon = ({ children }: IconProps) => {
  return (
    <Button.Default variant="default" size={'large'} className='label-md' onClick={() => console.log('test')}>
      <Image src={iconCamera} alt="Camera Icon" width={32} height={32} />
      {children}
    </Button.Default>
  )
}

export default Icon;