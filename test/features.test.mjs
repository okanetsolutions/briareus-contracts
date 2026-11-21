import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../features/features.json', import.meta.url)));
const LEVELS = new Set(['full', 'partial', 'none', 'n/a']);

test('every feature says where each client stands, and only in the known terms', () => {
  for (const area of data.areas) {
    for (const f of area.features) {
      assert.deepEqual(Object.keys(f.support).sort(), [...data.clients].sort(), `${f.id}: support lists every client`);
      for (const [client, level] of Object.entries(f.support)) assert.ok(LEVELS.has(level), `${f.id}.${client}: ${level}`);
      for (const client of Object.keys(f.notes ?? {})) assert.ok(data.clients.includes(client), `${f.id}: note for unknown ${client}`);
    }
  }
});

test('feature and area ids are unique', () => {
  for (const ids of [data.areas.map((a) => a.id), data.areas.flatMap((a) => a.features.map((f) => f.id))]) {
    assert.equal(new Set(ids).size, ids.length, ids.filter((id, i) => ids.indexOf(id) !== i).join(', '));
  }
});

test('a partial or n/a mark says why', () => {
  for (const f of data.areas.flatMap((a) => a.features)) {
    for (const [client, level] of Object.entries(f.support)) {
      if (level === 'partial' || level === 'n/a') assert.ok(f.notes?.[client], `${f.id}.${client} is ${level} without a note`);
    }
  }
});

test('every feature Windows offers names its screens or says why it is not drawn, and each screen has a scene and a preview', () => {
  for (const f of data.areas.flatMap((a) => a.features)) {
    // Windows is the reference the wireframes are drawn from: whatever it offers is on a screen, or says why not.
    if (['full', 'partial'].includes(f.support.windows)) assert.ok(f.wireframes?.length || f.undrawn, `${f.id}: no wireframes and no undrawn reason`);
    if (f.undrawn) assert.ok(!f.wireframes?.length, `${f.id}: undrawn but lists wireframes`);
    for (const w of f.wireframes ?? []) {
      for (const ext of ['excalidraw', 'svg']) {
        assert.ok(existsSync(new URL(`../wireframes/${w}.${ext}`, import.meta.url)), `${f.id}: no wireframes/${w}.${ext}`);
      }
    }
  }
});

test('a retired feature is gone from the matrix and names only known clients', () => {
  const live = new Set(data.areas.flatMap((a) => a.features.map((f) => f.id)));
  const retired = (data.retired ?? []).map((f) => f.id);
  assert.equal(new Set(retired).size, retired.length, 'retired ids are unique');
  for (const f of data.retired ?? []) {
    assert.ok(!live.has(f.id), `${f.id} is both retired and live`);
    assert.ok(f.title, `${f.id}: retired without a title`);
    assert.ok(f.reason, `${f.id}: retired without a reason`);
    for (const client of Object.keys(f.leftovers ?? {})) assert.ok(data.clients.includes(client), `${f.id}: leftover for unknown ${client}`);
  }
});
