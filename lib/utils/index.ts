import { StyleTools } from '$lib/types/styles';

export function generateStyles(
  props: Partial<StyleTools>,
): string | string[] | { [x: string]: boolean } | { [x: string]: boolean }[] {
  return [
    `items-${props.align || 'center'}`,
    `justify-${props.justify || 'start'}`,
    `flex-${props.flex || 'auto'}`,
  ];
}
