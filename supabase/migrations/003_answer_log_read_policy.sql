-- Allow parents to read their children's answer_log entries (needed for dashboard)
create policy "Child owner can read answer_log" on public.answer_log
  for select using (
    child_id in (select id from public.children where parent_id = auth.uid())
  );
