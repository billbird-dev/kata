import { KataSchema } from 'src/types';
import { randomId } from './index';

export const SCHEMA_BASE: KataSchema = {
  header: {
    component: 'kata-header',
    children: [],
    parent: true,
    id: randomId(),
    config: {
      justify: 'between',
    },
  },
  intro: {
    component: 'container',
    id: randomId(),
    parent: true,
    children: [],
    config: {
      flex: 'auto',
    },
    classes: ['flex-auto'],
  },
};
