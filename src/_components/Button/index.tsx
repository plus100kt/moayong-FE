import Default from './default';
import Icon from './icon';

/**
 * @example
    <Button.Default variant="default" size={'xlarge'} onClick={() => console.log('test')}>
      Shadcn 테스트 버튼
    </Button.Default>
    <Button.Default variant="secondary" size={'xsmall'}>Primary</Button.Default>
    <Button.Icon disabled>저축 인증하기</Button.Icon>
 */
const Button = {
  Default,
  Icon
};

export default Button;
