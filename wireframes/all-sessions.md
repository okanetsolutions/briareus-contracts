# All sessions

[Preview](all-sessions.svg) · [Editable scene](all-sessions.excalidraw)

Add **All** as the first row in the project list, above the individual projects. Selecting it opens one combined conversation list headed **All**, with **All projects** as the back action, following the existing project-to-conversation navigation. This is a proposed shared client contract; this repository does not implement client navigation.

## List behavior

- Include sessions from every project accessible to the current token on the connected server, including closed sessions as in the existing project lists; deleted sessions do not appear.
- Use the existing `GET /api/v1/projects` and `GET /api/v1/sessions` catalog operations, omitting the session request's `repo` filter for All; no new API endpoint or synthetic project is needed.
- Render each session once by its session ID, preserving the server list order and the existing status/PR glyph, provider, branch, state and age metadata.
- Add a project label to every session row, resolving its repository to the project title; use the repository identifier when no title is available, and expose the full identifier to distinguish duplicate titles.
- The All row's count is the number of accessible sessions, not the number of projects; any working indicator follows the existing project-row convention across those sessions.
- Selecting a session opens its existing conversation and details using that session's actual project and repository; returning from it preserves All, the selected session and the list's scroll position.
- Selecting an individual project continues to show only that project's sessions; All is a navigation scope and must never be passed as a repository or project ID.
- From All, New session uses the existing project picker and requires a real project before starting; All has no project settings, pull requests or other project-specific tabs.

Use the server-authorized list and the active connection's cache only. Keep the combined list current with the existing session update/refresh mechanism; closing retains a row with its new state, deletion removes it, and new sessions join the list without duplicates. On sign-out, server change, or changed access, clear the previous scope and its cached rows according to existing client behavior.

## States and platforms

While the first list loads, show **Loading sessions…**, without presenting an unloaded count as zero. A successful empty result shows **No sessions across your projects yet.** with **New session** when permitted. On failure, show **Could not load sessions. Retry**; retained rows must be marked stale, and an incomplete result must not be presented as all sessions. Hide the entry when the server catalog lacks the required list operations. Read-only tokens can browse, with the same restrictions on actions as an individual project list.

Windows and Mac retain the 268px sidebar beside the conversation and the existing details panel. Below `layout.narrowWidth` (1024px), projects → All sessions → conversation are consecutive panes with Back navigation. iPhone follows that flow; iPad switches at the shared breakpoint. Quest retains its separate list/conversation panels, headset type scale and existing worker nesting; project labels remain visible. Project labels may wrap or truncate visually, but their full text must be available to assistive technology. Keyboard focus and the selected state follow existing project and session rows.

## Reference

The shell, project rows and session metadata follow [briareus-windows at 35f7d87](https://github.com/okanetsolutions/briareus-windows/tree/35f7d87a80ce576a7fc2e2b59f33c510de5141e1): `app/main.c`, `app/screen_projects.c`, `app/screen_projects_sessions.c`, and `app/screen_projects_rows.c`. Windows already requests the unfiltered sessions list for project counts, then opens project-filtered lists. The All entry and project labels in combined rows are proposed additions. Existing conversation controls and details remain defined by [the conversation wireframe](conversation.svg).

Regenerate both files with `node scripts/all-sessions-wireframes.mjs`. Names, counts and session contents in the drawings are examples.
