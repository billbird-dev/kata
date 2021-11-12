import { HeaderInfoStyles, StyleTools } from 'kata';

export type componentNames = 'kata-header' | 'header-info' | 'header-logo';

export type CombinedConfig = { [x: string]: string | number } & StyleTools & HeaderInfoStyles;

export interface Block {
  component: componentNames;
  config?: CombinedConfig;
  children?: Block[];
  props?: Record<string, { [x: string]: any }>;
  id: string;
}
