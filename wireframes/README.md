# Wireframes

One wireframe per screen, not one per platform, for the Windows client's screens (the ones not drawn yet are listed below): Windows, the Mac, iPhone and iPad, Android and Quest all build the same structure. They set what sits where. Colour, type and spacing come from the tokens in [`tokens/`](../tokens), so the wireframes are drawn in greys on purpose.

[briareus-windows](https://github.com/okanetsolutions/briareus-windows) is the reference for how a screen looks: each wireframe is drawn from its layout code (`app/main.c`, `app/screen_*.c`), and the other clients match that structure, differing only where the platform notes say.

Across these drawings, the 🎙 Meet header button and the Meeting assistant and Database pool entries in the settings sidebar are retired; the rows below note other retired parts.

| Screen | File | Features |
| --- | --- | --- |
| Pairing | [`pairing.excalidraw`](pairing.excalidraw) · [preview](pairing.svg) | Pair with a device token, Adapt to server and token; its "web dashboard" token instructions are out of date: tokens are made on the server with `npm run create-token` |
| Conversation | [`conversation.excalidraw`](conversation.excalidraw) · [preview](conversation.svg) | Projects and conversations, Bulk close/delete, Start a conversation, Worktree / Local / Orchestrator, Incremental transcript, Markdown replies, Collapsible tool activity, Session details panel, Send follow-ups, Attach files, Voice notes, Take back queued messages, Answer agent questions, Stop a turn, Close, reopen, delete, Rename, Compact and clear, List beside conversation, Detached windows / panels, Find in conversation; the review loop chip and findings section drawn here are retired (core #228) |
| Shared browser | [`browser.excalidraw`](browser.excalidraw) · [preview](browser.svg) | Watch and drive the shared browser, Detached windows / panels |
| ⚡ Webhook | [`webhook.excalidraw`](webhook.excalidraw) · [preview](webhook.svg) | Session webhook; the drawing predates 0 meaning no limit for Turns in a row |
| Project · Pull requests | [`project-pulls.excalidraw`](project-pulls.excalidraw) · [preview](project-pulls.svg) | Adapt to server and token, Saved state and incremental resume, Live session updates, Pull request list, Run preview, Errands, Merge; the Meeting tab drawn here is retired |
| Project · Issues | [`project-issues.excalidraw`](project-issues.excalidraw) · [preview](project-issues.svg) | Issue list |
| Project · Board | [`project-board.excalidraw`](project-board.excalidraw) · [preview](project-board.svg) | Issue page, GitHub Projects board |
| Project · Review List | [`project-review-list.excalidraw`](project-review-list.excalidraw) · [preview](project-review-list.svg) | Errands, Merge, Review List |
| Project · Files | [`project-files.excalidraw`](project-files.excalidraw) · [preview](project-files.svg) | Repository file browser, Code search & navigation |
| Project · Run (default branch) | [`project-run.excalidraw`](project-run.excalidraw) · [preview](project-run.svg) | Run default branch, Watch and drive the shared browser |
| Project · SSH sessions | [`project-ssh.excalidraw`](project-ssh.excalidraw) · [preview](project-ssh.svg) | SSH terminal |
| Project · SFTP sessions | [`project-sftp.excalidraw`](project-sftp.excalidraw) · [preview](project-sftp.svg) | SFTP file browser |
| Project · Database | [`project-db.excalidraw`](project-db.excalidraw) · [preview](project-db.svg) | Database browser |
| Project · Forge | [`project-deploy.excalidraw`](project-deploy.excalidraw) · [preview](project-deploy.svg) | Laravel Forge sites |
| Pull request | [`pull-request.excalidraw`](pull-request.excalidraw) · [preview](pull-request.svg) | PR overview, Files changed and diffs, PR comments and review threads, Run preview, Errands, Merge, Edit PR/issue and update branch, Detached windows / panels; the Findings tab drawn here is retired (core #228), and Windows retired the Checks and Commits tabs |
| Issue | [`issue.excalidraw`](issue.excalidraw) · [preview](issue.svg) | Edit PR/issue and update branch, Issue page, Start a session on an issue, Close an issue |
| Findings | [`findings.excalidraw`](findings.excalidraw) · [preview](findings.svg) | Detached windows / panels; its findings queue and triage are retired (core #228), and its note that Windows lacks SSH approvals is out of date |
| Dashboard | [`dashboard.excalidraw`](dashboard.excalidraw) · [preview](dashboard.svg) | Spend dashboard, Detached windows / panels; the drawing predates provider quotas on the dashboard, which Windows now lists, and its "web dashboard" token instructions are out of date |
| Mail | [`mail.excalidraw`](mail.excalidraw) · [preview](mail.svg) | Mail inbox; the drawing shows the earlier reply-at-provider flow, Windows now replies in the thread |
| WhatsApp | [`whatsapp.excalidraw`](whatsapp.excalidraw) · [preview](whatsapp.svg) | WhatsApp, Detached windows / panels |
| Meeting assistant (retired) | [`meeting.excalidraw`](meeting.excalidraw) · [preview](meeting.svg) | None: the meeting assistant was removed from every client; kept for reference |
| Settings · Projects | [`settings-projects.excalidraw`](settings-projects.excalidraw) · [preview](settings-projects.svg) | Adapt to server and token, Projects settings; the db chip on project rows drawn here is retired (core #274) |
| Settings · Providers | [`settings-providers.excalidraw`](settings-providers.excalidraw) · [preview](settings-providers.svg) | Provider quotas, Providers settings |
| Settings · SSH servers, Forge accounts | [`settings-servers.excalidraw`](settings-servers.excalidraw) · [preview](settings-servers.svg) | SSH servers, Forge accounts; the Database pool section drawn here is retired (core #274) |
| Settings · This computer, Mail, MCP servers | [`settings.excalidraw`](settings.excalidraw) · [preview](settings.svg) | Mail accounts, MCP servers; the Meeting assistant section drawn here is retired |

## All sessions proposal

The [All sessions preview](all-sessions.svg) and [editable scene](all-sessions.excalidraw) add **All** above the individual projects, opening a combined session list with a project label on every row. Wide and narrow layouts follow the existing Windows navigation. See [behavior, platform notes and source revision](all-sessions.md). This is a proposed client feature; regenerate both files with `node scripts/all-sessions-wireframes.mjs`.

## Home Assistant

Windows implements these screens on core's Home Assistant bridge; the other clients do not yet. They were drawn as proposals in the Windows shell before it shipped them. See [behavior and source revisions](home-assistant.md).

| Screen | File | Features |
| --- | --- | --- |
| Home Assistant · Connection | [scene](home-assistant-connection.excalidraw) · [preview](home-assistant-connection.svg) | Home Assistant connection |
| Home Assistant · Entities | [scene](home-assistant.excalidraw) · [preview](home-assistant.svg) | Home Assistant entities, Home Assistant actions, Menu device status |
| Home Assistant · Actions | [scene](home-assistant-action.excalidraw) · [preview](home-assistant-action.svg) | Home Assistant actions |
| Home Assistant · Events | [scene](home-assistant-event.excalidraw) · [preview](home-assistant-event.svg) | Home Assistant events |

These four scenes, the menu status proposal, and their previews can be regenerated together with `node scripts/home-assistant-wireframes.mjs`.

Not drawn, because Windows does not offer them (27): Revoke token from the app, Weak or lost connection, Pin conversations, Task cost history, Side question (/btw), Guard uncertain sends, QA loop toggle, Link a pull request, Recover interrupted session, Annotated preview feedback, QA recordings, GitHub deployments, Envoyer accounts & deployments, Agent memories, SSH host monitoring, Slack workspaces, Server administration, Devices & tokens, Personal connections, Sharing, Background notifications, Reply from notification, GPT-Realtime voice assistant, Hands-free conversation line, CarPlay, Slack inbox, Search conversations. When one is built, draw it from the client that has it.

Offered by Windows but not drawn yet (18): Self-update, Waiting on background work, Pictures in replies, Saved prompt library, Session mail wake, SSH and Slack approvals, Stored code reviews, Review outcome and security pass, Review approvals, Security overview, Resource stats, CI/CD statistics, GitHub accounts, Project GitHub account and health, Waiting/working overview, Pull requests waiting on you, Sleep mode, Now playing. Each says so with `undrawn` in `features/features.json`; draw it from the Windows screen and replace `undrawn` with its `wireframes`.

Not drawn by design: Light and dark themes (colour comes from the tokens, and the wireframes are greys).

## Menu status proposal

The [menu status preview](menu-status.svg) and [editable scene](menu-status.excalidraw) show a collapsible block for local CPU, memory, and battery readings, also included in the Home Assistant screens. See [scope and platform behavior](menu-status.md). These are example readings; telemetry is not implemented by this change.

## Editing

The files are [Excalidraw](https://excalidraw.com) scenes, which are plain JSON, so a change goes through review as a diff like any token. Open one at excalidraw.com (Open, or drag the file in) or with the Excalidraw extension for VS Code, edit it, and save it back over the same file. Then export it as SVG (Export image → SVG) over the `.svg` beside it: that is the preview GitHub shows, and nothing checks that it matches the scene.

## The rules

- **Name regions after the tokens.** Label boxes with the `theme.*` roles (`sidebar`, `canvas`, `raise`, `sunken`) and the `layout.*` widths (`sidebarWidth`, `panelWidth`, `narrowWidth`, `paneMargin`), so every client reads a box the same way.
- **Draw wide and narrow.** One frame at or above `layout.narrowWidth` (1024px) and the one-column flow below it. A platform gets its own frame only where its structure differs, not just its chrome.
- **Write platform differences as notes on the canvas**, under "Platform notes", in the same terms as the notes in [`features/features.json`](../features/features.json).
- **Link features to their screens.** Each feature lists the screens it lives on, main one first, as `"wireframes": ["<file name without the extension>"]` in `features/features.json`, and FEATURES.md links to them. `npm test` fails if a feature Windows offers has no screen and no `"undrawn"` reason, or if a listed screen has no `.excalidraw` or `.svg`. Link a screen only if its drawing shows the feature.
