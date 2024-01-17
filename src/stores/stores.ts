import { writable } from "svelte/store";

// TODO: create a proper recursive object type

export const root = writable<Record<string, string | number | object | Array<string | number | object>>>({});

export const nodes = writable<{ id: string, key: string, position: { x: number, y: number }}[]>([]);