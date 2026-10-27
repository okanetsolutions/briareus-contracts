// Generate the proposed All sessions scene and its matching SVG preview.
import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const sizes = JSON.parse(await readFile(new URL('tokens/size.json', root)));
const sidebar = parseInt(sizes.layout.sidebarWidth.$value);
const panel = parseInt(sizes.layout.panelWidth.$value);
const margin = parseInt(sizes.layout.paneMargin.$value);
const narrow = parseInt(sizes.layout.narrowWidth.$value);
const width = 1900, height = 1470;
const elements = [], svg = [];
let frameId = null;
const escape = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function element(type, x, y, w, h, extra = {}) {
  const id = `all-sessions-${elements.length + 1}`;
  const value = { id, type, x, y, width: w, height: h, angle: 0,
    strokeColor: '#303030', backgroundColor: 'transparent', fillStyle: 'solid',
    strokeWidth: 1, strokeStyle: 'solid', roughness: 0, opacity: 100,
    groupIds: [], frameId, roundness: null, seed: elements.length + 1,
    version: 1, versionNonce: elements.length + 1, isDeleted: false,
    boundElements: null, updated: 1, link: null, locked: false, ...extra };
  elements.push(value);
  return value;
}
function box(x, y, w, h, fill = '#ffffff') {
  element('rectangle', x, y, w, h, { backgroundColor: fill });
  svg.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="#303030"/>`);
}
function text(x, y, value, size = 14) {
  const lines = value.split('\n');
  element('text', x, y, Math.max(...lines.map(s => s.length)) * size * 0.61, lines.length * size * 1.25,
    { text: value, originalText: value, fontSize: size, fontFamily: 3, textAlign: 'left',
      verticalAlign: 'top', containerId: null, autoResize: true, lineHeight: 1.25 });
  svg.push(`<text x="${x}" y="${y}" xml:space="preserve" style="white-space:pre" font-family="monospace" font-size="${size}" fill="#303030">${lines.map((s, i) => `<tspan x="${x}" dy="${i ? size * 1.25 : size}">${escape(s)}</tspan>`).join('')}</text>`);
}
function frame(x, y, w, h, label) {
  frameId = null;
  const e = element('frame', x, y, w, h, { name: label });
  text(x, y - 26, label);
  frameId = e.id;
  box(x, y, w, h);
}
function list(x, y, w) {
  box(x, y, w, 820, '#eeeeee');
  text(x + 14, y + 18, '+ New session', 16);
  text(x + 14, y + 53, 'WhatsApp  Mail  Dashboard', 13);
  text(x + 14, y + 103, '< All projects');
  text(x + 14, y + 139, 'All', 22);
  text(x + w - 44, y + 145, '24', 16);
  const rows = [
    ['Fix the rate calculator', 'Project A', 'claude / fix-rate', 'running / 2m ago'],
    ['Update contract tokens', 'Project B', 'codex / tokens', 'waiting / 8m ago'],
    ['Add the deposit screen', 'Project A', 'claude / deposit', 'idle / 1h ago'],
    ['Upgrade the mail client', 'Project C', 'codex / mail', 'closed / 3h ago']
  ];
  rows.forEach(([title, project, metadata, state], i) => {
    const top = y + 191 + i * 119;
    box(x + 10, top, w - 20, 109, i === 0 ? '#dddddd' : '#f5f5f5');
    text(x + 18, top + 10, `● ${title}`, 13);
    text(x + 18, top + 34, project, 14);
    text(x + 18, top + 58, metadata, 12);
    text(x + 18, top + 80, state, 12);
  });
  text(x + 14, y + 696, 'More sessions / scroll', 12);
  text(x + 14, y + 750, 'Select  Settings  Sign out', 13);
  text(x + 14, y + 785, 'theme.sidebar', 13);
}

text(40, 16, 'All sessions / proposed shared client view', 22);
frame(40, 90, 1400, 820, `Wide / at least layout.narrowWidth (${narrow}px)`);
list(40, 90, sidebar);
const main = 40 + sidebar, detail = 1440 - panel;
text(main + margin, 112, 'Fix the rate calculator', 22);
text(main + margin, 150, 'Project A / claude / fix-rate / running');
text(main + margin, 182, 'Browser   Webhook   Stop   Close   Delete', 13);
box(main + margin, 242, detail - main - margin * 2, 94, '#eeeeee');
text(main + margin + 14, 261, 'Check how rounding affects the final rate.');
text(main + margin, 374, 'I am checking the calculation and its callers.');
text(main + margin, 419, '> Tool activity / existing transcript');
text(main + margin, 607, 'Conversation stays attached to Project A.');
text(main + margin, 694, 'Project A / fix-rate / claude / opus / high', 13);
box(main + margin, 735, detail - main - margin * 2, 100, '#eeeeee');
text(main + margin + 14, 750, 'Reply...');
text(main + margin + 14, 800, 'Attach   Voice                                  Send', 13);
text(main + margin, 873, 'theme.canvas / layout.paneMargin = 18px', 13);
box(detail, 90, panel, 820, '#f5f5f5');
text(detail + 14, 112, 'Pull request', 18);
text(detail + 14, 153, 'Project A / PR #123');
text(detail + 14, 194, 'Checks / Reviews');
text(detail + 14, 235, 'Findings');
text(detail + 14, 276, 'Context usage');
text(detail + 14, 850, 'theme.sunken', 13);
text(detail + 14, 875, 'layout.panelWidth 272px', 13);
frame(1480, 90, 390, 820, 'Narrow / one pane below 1024px');
list(1480, 90, 390);

frame(40, 1000, sidebar, 310, 'Entry / project list');
box(40, 1000, sidebar, 310, '#eeeeee');
text(54, 1018, '+ New session', 16);
text(54, 1060, 'Projects', 18);
box(50, 1100, sidebar - 20, 39, '#dddddd');
text(64, 1109, 'All                    24', 13);
text(64, 1161, 'Project A              12', 13);
text(64, 1200, 'Project B               7', 13);
text(64, 1239, 'Project C               5', 13);
text(54, 1283, 'layout.sidebarWidth 268px', 13);
frameId = null;
text(350, 1000, 'Behavior and platform notes', 20);
[
  'Select All above the projects to open the combined session list shown above.',
  'Each row names its project; status/PR glyph, provider, branch and age follow the existing list.',
  'Only sessions accessible to the current token on the connected server are included.',
  'Opening a session uses its real project. Back preserves All and its scroll position.',
  'All has no project tabs. New session requires a real project in the existing picker.',
  'Windows/Mac: sidebar beside conversation; iPhone/narrow iPad: projects > All > conversation.',
  'Quest: separate list/conversation panels, headset.type sizing and existing worker nesting.',
  'Loading sessions... / No sessions across your projects yet. / Could not load sessions. Retry',
  'Counts and contents are examples; the scrollable list shows four of the 24 sessions.'
].forEach((line, i) => text(350, 1046 + i * 29, line, 14));
text(40, 1360, 'Reference: Windows shell at 35f7d87. All and project labels are proposed additions; see all-sessions.md.', 14);
text(40, 1394, 'Shared theme.* and layout.* roles apply. Existing conversation controls: conversation.svg.', 14);

const byId = new Map(elements.map(e => [e.id, e]));
assert.equal(byId.size, elements.length);
for (const e of elements) {
  assert.ok(e.x >= 0 && e.y >= 0 && e.x + e.width <= width && e.y + e.height <= height, `Outside canvas: ${e.text ?? e.id}`);
  if (e.frameId) {
    const f = byId.get(e.frameId);
    assert.ok(f?.type === 'frame');
    assert.ok(e.x >= f.x && e.y >= f.y && e.x + e.width <= f.x + f.width && e.y + e.height <= f.y + f.height, `Outside frame: ${e.text ?? e.id}`);
  }
}
const scene = { type: 'excalidraw', version: 2, source: 'https://excalidraw.com', elements,
  appState: { viewBackgroundColor: '#ffffff', gridSize: null }, files: {} };
await writeFile(new URL('wireframes/all-sessions.excalidraw', root), JSON.stringify(scene, null, 2) + '\n');
await writeFile(new URL('wireframes/all-sessions.svg', root), `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">All sessions: proposed project entry, wide and narrow views</title><rect width="100%" height="100%" fill="white"/>${svg.join('\n')}</svg>\n`);
