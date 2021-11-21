import { CombinedComponentConfig } from 'kata';

export type componentNames = 'kata-header' | 'header-info' | 'header-logo';
export type componentProps = Record<string, string | number | { [x: string]: any }>;
export type CombinedConfig = { [x: string]: string | number | undefined } & CombinedComponentConfig;

export interface Block {
  component: componentNames;
  config?: CombinedConfig;
  children: Block[];
  props?: componentProps;
  id: string;
  parent: boolean;
}

export type Classes = (string | { [x: string]: boolean })[];

export type SectionName = 'header' | 'intro' | 'info' | 'items' | 'total-footer' | 'summary' | 'misc';

export type AcceptedComponents = { [x in Block['component']]?: (keyof CombinedComponentConfig)[] };

export interface Section {
  name: SectionName;
  classes?: Classes;
  max: number;
  components: AcceptedComponents;
}

export type InvoiceSchema = { [x in SectionName]?: Section };
