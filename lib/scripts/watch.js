const CheapWatch = require('cheap-watch');
const { execSync } = require('child_process');
const { resolve } = require('path');

async function main() {
  // @ts-ignore
  const watcher = new CheapWatch({
    dir: resolve(__dirname, '../src'),
    debounce: 50,
  });

  function buildLib() {
    try {
      console.info('building lib');

      execSync('npm run build');

      console.info('done');
    } catch (error) {
      console.log(error);
    }
  }

  await watcher.init();

  watcher.on('+', buildLib);

  watcher.on('-', buildLib);
}

main();
