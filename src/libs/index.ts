import $ from 'jquery';

const globalAny: NodeJS.Global & typeof globalThis & { jQuery?: unknown, $?: unknown } = global;

globalAny.jQuery = $;
globalAny.$ = $;
