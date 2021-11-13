import { HeaderInfoStyles, StyleTools } from 'kata';
import { CombinedComponentConfig } from 'kata/src';

export type componentNames = 'kata-header' | 'header-info' | 'header-logo';

export type CombinedConfig = { [x: string]: string | number | undefined } & CombinedComponentConfig;

export interface Block {
  component: componentNames;
  config?: CombinedConfig;
  children: Block[];
  props?: Record<string, { [x: string]: any }>;
  id: string;
  parent: boolean;
}

export type Classes = (string | { [x: string]: boolean })[];
