-- 1. Add trophies to children
alter table public.children
  add column if not exists trophies int not null default 100;

-- 2. Friendships
create table if not exists public.friendships (
  id            uuid primary key default gen_random_uuid(),
  requester_id  uuid not null references public.children(id) on delete cascade,
  addressee_id  uuid not null references public.children(id) on delete cascade,
  status        text not null default 'pending'
                  check (status in ('pending', 'accepted', 'rejected')),
  created_at    timestamptz not null default now(),
  constraint friendships_no_self_friend check (requester_id <> addressee_id),
  constraint friendships_unique_pair unique (requester_id, addressee_id)
);
alter table public.friendships enable row level security;
create policy "friendship_select" on public.friendships for select using (
  requester_id in (select id from public.children where parent_id = auth.uid())
  or addressee_id in (select id from public.children where parent_id = auth.uid())
);
create policy "friendship_insert" on public.friendships for insert with check (
  requester_id in (select id from public.children where parent_id = auth.uid())
);
create policy "friendship_update" on public.friendships for update using (
  addressee_id in (select id from public.children where parent_id = auth.uid())
);

-- 3. Challenges
create table if not exists public.challenges (
  id                uuid primary key default gen_random_uuid(),
  challenger_id     uuid not null references public.children(id) on delete cascade,
  challenged_id     uuid not null references public.children(id) on delete cascade,
  topic_id          uuid not null references public.topics(id) on delete cascade,
  status            text not null default 'pending'
                      check (status in ('pending', 'active', 'completed', 'declined')),
  trophy_bet        int not null default 10,
  challenger_score  numeric(5,2),
  challenged_score  numeric(5,2),
  winner_id         uuid references public.children(id) on delete set null,
  deadline          timestamptz,
  created_at        timestamptz not null default now(),
  completed_at      timestamptz,
  constraint challenges_no_self check (challenger_id <> challenged_id)
);
alter table public.challenges enable row level security;
create policy "challenge_select" on public.challenges for select using (
  challenger_id in (select id from public.children where parent_id = auth.uid())
  or challenged_id in (select id from public.children where parent_id = auth.uid())
);
create policy "challenge_insert" on public.challenges for insert with check (
  challenger_id in (select id from public.children where parent_id = auth.uid())
);
create policy "challenge_update" on public.challenges for update using (
  challenger_id in (select id from public.children where parent_id = auth.uid())
  or challenged_id in (select id from public.children where parent_id = auth.uid())
);

-- 4. Discover policy
drop policy if exists "children_public_discover" on public.children;
create policy "children_public_discover" on public.children for select using (true);

-- 5. Cross-child progress read for challenges
drop policy if exists "progress_challenge_read" on public.progress;
create policy "progress_challenge_read" on public.progress for select using (
  exists (
    select 1 from public.challenges c
    where c.status in ('active', 'completed')
      and c.topic_id = progress.topic_id
      and (
        (c.challenger_id = progress.child_id
          and c.challenged_id in (select id from public.children where parent_id = auth.uid()))
        or
        (c.challenged_id = progress.child_id
          and c.challenger_id in (select id from public.children where parent_id = auth.uid()))
      )
  )
);
