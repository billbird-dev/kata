import { useStorage } from '@vueuse/core';
import { KataSchema } from 'src/types';

export const schemaStore = useStorage('kata-user-schema', new Map<string, KataSchema>());
