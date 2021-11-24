export type VAlign = 'start' | 'end' | 'center';
export type HALign = 'start' | 'end' | 'center' | 'between';
export type ItemGrow = 'auto' | 'shrink' | 'grow' | 'none';

export interface StyleTools {
  align?: VAlign;
  justify?: HALign;
  flex?: ItemGrow;
}

// Spacing

export type Space = '1' | '2' | '3' | '4' | '5';

// Font size
export type FontSize = 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl';

export interface HeaderInfoStyles extends StyleTools {
  space?: Space;
}

export interface TextElementStyles extends StyleTools {
  fontSize?: FontSize;
}

export type CombinedComponentConfig = Partial<StyleTools & HeaderInfoStyles & TextElementStyles>;
