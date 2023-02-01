import { defineConfig, PluginOption } from 'vite';
import path from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, './src/index.html'),
      },
    },
  },
  server: {
    host: true,
  },
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, './src/partials/'),
      helpers: {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        concatClassNames: (...params: unknown[]) =>
          params
            .filter((param) => typeof param === 'string' && !!param)
            .join(' '),
        concat: (...values: unknown[]) =>
          values
            .filter((value) => typeof value === 'string' && !!value)
            .join(''),
        ternary: (cond: unknown, a: unknown, b: unknown) => (cond ? a : b),
        is: (a: unknown, b: unknown) => (a ? b : null),
        eq: (a: unknown, b: unknown) => a === b,
        or: (...values: unknown[]) =>
          values
            .filter((param) => typeof param === 'boolean')
            .some((value) => value),
        fallback: (a: unknown, b: unknown) => a ?? b,
        padZero: (val: unknown, maxLength: number) =>
          String(val).padStart(
            typeof maxLength === 'number' ? maxLength : 2,
            '0',
          ),
        times: (number: number, block: any) =>
          [...Array(number)].reduce((acc, _, i) => `${acc}${block.fn(i)}`, ''),
        add: (a: number, b: number) => a + b,
        capitalizeFirstLetter: (text: string) =>
          `${text.charAt(0).toUpperCase()}${text.slice(1)}`,
        parseJson: (jsonString: string) => JSON.parse(jsonString),
        dataById: (
          items: { id: number | string }[],
          id: number | string,
          block: any,
        ) => {
          return block.fn(items.find((item) => item.id === id));
        },
        /* eslint-enable @typescript-eslint/no-explicit-any */
      },
    }) as PluginOption,
  ],
});
