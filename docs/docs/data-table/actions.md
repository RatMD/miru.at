# Row operations

Actions belong to the application. DataTable supplies selection, controls and confirmation, while callbacks or the configured transport perform the work.

## Row actions

Each action has a stable key, label and `execute(item)` callback. Optional `visible`, `disabled` and confirmation settings control availability. `priority` keeps primary actions inline when secondary actions move into overflow; the desktop menu appears above four visible actions. Mobile actions use a sheet.

Set `rowAction` to a key or priority-ordered keys for row activation. Hidden, disabled and confirmation actions are excluded. Interactive controls within a row keep their own behaviour.

## Controlled selection

Bind `v-model:selected` to string row keys. `rowKey` defaults to a record’s id, then its index; supply a stable field or function for records without ids. Index fallback cannot preserve identity after reordering. `rowSelectable` restricts selection per record.

Query navigation clears selection. Bulk execution uses selected rows present on the current result page; retaining keys from other pages does not imply cross-page bulk processing. The bulk action’s `selection_field` controls submitted record values and is separate from `rowKey`.

## Bulk actions

Declare available operations in `list.config.actions`. Entries include a key, label or translation key, method, URL and optional confirmation or selection limits. Controls appear when rows are selected and actions are configured.

Submission uses the configured `navigation` adapter. The browser default sends AJAX and reloads after success; `createMiru({ adapter: inertiaAdapter() })` supplies Inertia visits. For JSON APIs, supply `bulkActionHandler(action, selection)` returning void or a Promise. Successful completion clears selection. Rejection retains it and emits `bulk-action-error`; update the bound list after success.

## Reordering

`createSortOrderColumn` expects records with id, sort_order, can_reorder, can_move_up and can_move_down. Supply `moveHandler(item, direction)` for a custom transport, or `moveUrl(item)` for PATCH through the configured navigation adapter. The handler takes precedence.

Update rows and boundary flags after a successful move. Pending controls block repeated requests; a failed move displays translated feedback and allows retry. Permissions remain authoritative on the server.

## Busy and disabled rows

`loading` displays loading content and blocks table interactions. `disabled` blocks interactions while keeping rows visible. `rowDisabled` and `rowLoading` apply availability per record. Custom cell slots receive disabled/loading state; custom controls must apply it themselves.

Column visibility and ordering preferences persist locally under `tableKey`. Rows, query state, filters and mutations remain application-owned. Use distinct keys for parent and child tables.
