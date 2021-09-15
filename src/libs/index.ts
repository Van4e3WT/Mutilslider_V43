import $ from 'jquery';

const globalAny: typeof globalThis & { jQuery?: unknown, $?: unknown } = global;

globalAny.jQuery = $;
globalAny.$ = $;
