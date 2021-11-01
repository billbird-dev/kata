export type VAlign = 'start' | 'end' | 'center';
export type HALign = 'start' | 'end' | 'center' | 'between';
export type ItemGrow = 'auto' | 'shrink' | 'grow' | 'none';

export interface StyleTools {
  align: VAlign;
  justify: HALign;
  flex: ItemGrow;
}
