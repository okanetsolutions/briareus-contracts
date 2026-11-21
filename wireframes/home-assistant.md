# Home Assistant wireframes

These screens were drawn as proposals for the merged [Core bridge, PR #147](https://github.com/nadinyamaui/briareus/pull/147). Windows has since shipped a simpler version, reached from **Settings → Smart home**; for the other clients these drawings are still proposals. The bridge works independently of projects and agent sessions.

| Screen | Preview | Editable scene |
| --- | --- | --- |
| Connection and setup states | [SVG](home-assistant-connection.svg) | [Excalidraw](home-assistant-connection.excalidraw) |
| Entities and details | [SVG](home-assistant.svg) | [Excalidraw](home-assistant.excalidraw) |
| Service actions and receipts | [SVG](home-assistant-action.svg) | [Excalidraw](home-assistant-action.excalidraw) |
| Send an event | [SVG](home-assistant-event.svg) | [Excalidraw](home-assistant-event.excalidraw) |

## Navigation

Windows opens the screens from **Settings → Smart home**, an entry it always shows (it tells a non-Admin token what it needs). The drawings show the original proposal, a **Home Assistant** row below the projects that opens the entities screen. It is global, so a project does not need to be selected. Show the entry only when the API catalog exposes the bridge and the Briareus token has admin access. Read and manage tokens cannot use any bridge route.

On entry, check the connection. An unconfigured bridge opens the connection screen with setup guidance. A connected bridge opens entities. The wide header provides Entities, Actions, Events, and Connection destinations. Below 1024px, use a destination selector with those same labels under the Home Assistant title, followed by one pane at a time. The narrow drawings show the selected destination. Selecting an entity opens its detail pane; Back returns to the list with its domain filter intact.

Windows supplies the existing 268px sidebar, navigation labels, and narrow Back behavior. What Windows ships differs from these drawings: it has three tabs (Entities, Actions, Events) with the connection state as a status line above them instead of a Connection destination, and a picked entity's JSON shows above the list instead of in a detail pane. A client porting the screens should follow the Settings → Smart home entry and the Entities/Actions/Events split from Windows; the Connection destination, the detail pane and the catalog-gated entry remain the original proposal. Windows and Mac use the wide composition. iPhone and narrow iPad use one pane. Quest uses the same ordering with `headset.type` sizes and scrolling. The drawings use greys and identify the shared layout and theme tokens. The sidebar also includes the proposed [local device status block](menu-status.md), which is independent of Home Assistant.

## API behavior

All paths below are relative to `/api/v1` and require admin access.

| Screen | Requests | User-visible result |
| --- | --- | --- |
| Connection | `GET /home-assistant` | Connected when configured and connected are true; setup guidance when both are false; a connection error when the call fails. |
| Entities | `GET /home-assistant/entities?domain=light` | List entity names, IDs, and states; omit the domain query to list all entities. |
| Details | `GET /home-assistant/entities/{id}` | State, attributes, lastChanged, and lastUpdated; Choose action pre-fills entity_id. |
| Actions | `GET /home-assistant/services` | Available domains, services, descriptions, and field hints. |
| Run action | `POST /home-assistant/services/{domain}/{service}` | Changed entities and optional response data; these do not prove physical completion. |
| Send event | `POST /home-assistant/events/{type}` | An accepted receipt, without a claim that an automation completed. |

Action and event bodies are JSON objects sent directly, without a wrapper. The wireframes use a JSON editor so arbitrary service fields remain possible. Use service descriptions and field metadata as input help. Set `returnResponse=1` for services that require response data, or when supported and requested; otherwise omit it. Render returned response data read-only, including an empty changed-entity list when valid.

Poll entities only while the screen is visible and show when the last read succeeded. There is no subscription endpoint. On read failure, label retained values as stale and offer Retry. Show loading, empty-domain, unknown, unavailable, and missing-entity states without inventing a device status. Missing timestamps display as unknown.

Disable submission while an action or event is pending. A timeout or invalid receipt can mean the operation ran. Never retry a POST automatically. Offer **Read entity state** for a targeted action before the user decides whether to retry. For events or actions without an entity target, direct the user to check Home Assistant. A 400 retains the inputs with the error, a 404 reports the missing item, and a 429 reports rate limiting. A 403 removes access. An upstream credentials error is 502 and must not sign the user out of Briareus.

Connection credentials are configured on the server with `HOME_ASSISTANT_URL` and `HOME_ASSISTANT_TOKEN`, followed by a server restart. The client has no credential editor. Physical device setup, pairing, area management, and automation configuration stay in Home Assistant. The bridge exposes entities, not the device or area registries.

## Source revisions

Checked on 2026-10-12:

- [Core 44d930b](https://github.com/nadinyamaui/briareus/tree/44d930b09fc177759f76924f181e1483887cfe14): `docs/home-assistant.md`, `docs/api-v1-reference.md`, `lib/home-assistant.js`, and `lib/home-assistant-routes.js` define the bridge behavior.
- [Windows bf6359f](https://github.com/okanetsolutions/briareus-windows/tree/bf6359f9213979b52deef9f6d76f647109b359de): `app/main.c` and `app/screen_projects.c` define the reference shell; no Home Assistant client implementation was found.
- [Swift abb71be](https://github.com/okanetsolutions/briareus-swift/tree/abb71bec5825319c769218601c8361d85b5bc81a) and [Quest c71fb2e](https://github.com/okanetsolutions/briareus-quest/tree/c71fb2e94a253075496f2a9db4b7ca8d1ad34161): no Home Assistant client implementation was found.

Windows has since shipped the simpler version described under Navigation; the feature matrix records it as `full` and the other clients as `none` (audit of 2026-11-21).

## Editing

Run `node scripts/home-assistant-wireframes.mjs` to regenerate these four scenes and SVGs together. Edit that script for repeatable changes. It checks element IDs and frame bounds while generating. For manual Excalidraw edits, also export the matching SVG; running the generator later replaces those manual edits.
