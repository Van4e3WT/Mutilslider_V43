import $ from 'jquery';

const globalAny = global as NodeJS.Global & typeof globalThis & { jQuery: unknown, $: unknown };

globalAny.jQuery = $;
globalAny.$ = $;
