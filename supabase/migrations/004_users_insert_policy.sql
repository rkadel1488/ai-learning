-- Allow newly signed-up users to create their own profile row
create policy "Users can insert own row" on public.users
  for insert with check (auth.uid() = id);
