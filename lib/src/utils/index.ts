import { StyleTools } from '../types/styles';

export function generateStyles<T extends StyleTools>(props: Partial<T>): string[] {
  return [`items-${props.align || 'center'}`, `justify-${props.justify || 'start'}`, `flex-${props.flex || 'auto'}`];
}
