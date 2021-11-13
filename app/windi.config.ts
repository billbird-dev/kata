import { defineConfig } from 'windicss/helpers';

const COLORS = ['red', 'green', 'purple', 'indigo', 'cyan', 'amber', 'lime'];
interface Config {
  key: string;
  set: (string | number)[];
}

const SPACE_Y: Config = {
  key: 'space-y',
  set: [1, 2, 3, 4, 5],
};

const FLEX_ALIGN: Config = {
  key: 'align',
  set: ['start', 'end', 'center'],
};

const FLEX_JUSTIFY: Config = {
  key: 'justify',
  set: ['start', 'end', 'center', 'between'],
};

const FLEX_GROW: Config = {
  key: 'flex',
  set: ['auto', 'shrink', 'grow', 'none'],
};

const BG_COLOR: Config = {
  key: 'bg',
  set: [500, 400, 300, 50, 200, 100].map((el) => COLORS.map((c) => `${c}-${el}`)).flat(),
};

const HOVER_BG_COLOR: Config = {
  key: 'hover:bg',
  set: [300, 400].map((r) => COLORS.map((c) => `${c}-${r}`)).flat(),
};

function generateSafeList(config: Config[]) {
  return config.map((el) => el.set.map((s) => `${el.key}-${s}`));
}

export default defineConfig({
  darkMode: 'class',
  safelist: generateSafeList([SPACE_Y, FLEX_ALIGN, FLEX_GROW, FLEX_JUSTIFY, HOVER_BG_COLOR, BG_COLOR]),
  extract: { include: ['../**/src/**/*.{vue,html,jsx,tsx}', './node_modules/furikaeru/dist/*'] },
});
