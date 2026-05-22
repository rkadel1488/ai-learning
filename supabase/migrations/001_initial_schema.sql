-- Users (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  role text not null check (role in ('parent', 'teacher')),
  name text,
  created_at timestamptz default now()
);
alter table public.users enable row level security;
create policy "Users can read own row" on public.users for select using (auth.uid() = id);
create policy "Users can update own row" on public.users for update using (auth.uid() = id);

-- Children (student profiles under a parent)
create table public.children (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.users on delete cascade not null,
  name text not null,
  age int not null check (age between 6 and 18),
  track text not null check (track in ('story', 'levels', 'sandbox')),
  created_at timestamptz default now()
);
alter table public.children enable row level security;
create policy "Parent can manage own children" on public.children
  using (auth.uid() = parent_id);

-- Classes (teacher-created groups)
create table public.classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references public.users on delete cascade not null,
  name text not null,
  join_code text not null unique default upper(substring(gen_random_uuid()::text, 1, 6)),
  age_group text not null check (age_group in ('6-10', '11-14', '15-18')),
  created_at timestamptz default now()
);
alter table public.classes enable row level security;
create policy "Teacher can manage own classes" on public.classes
  using (auth.uid() = teacher_id);

-- Class members
create table public.class_members (
  class_id uuid references public.classes on delete cascade,
  child_id uuid references public.children on delete cascade,
  joined_at timestamptz default now(),
  primary key (class_id, child_id)
);
alter table public.class_members enable row level security;

-- Topics (seeded, not user-created)
create table public.topics (
  id uuid primary key default gen_random_uuid(),
  order_index int not null unique,
  title text not null,
  icon text not null,
  tier text not null check (tier in ('foundation', 'intermediate', 'advanced'))
);

-- Questions
create table public.questions (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid references public.topics on delete cascade not null,
  order_index int not null,
  track text not null check (track in ('story', 'levels', 'sandbox')),
  type text not null check (type in ('mcq', 'drag_drop', 'chat', 'build', 'story_choice')),
  prompt text not null,
  options jsonb,
  correct_answer text not null,
  explanation text not null,
  is_free boolean not null default false,
  unique (topic_id, order_index, track)
);

-- Progress (one row per child per topic)
create table public.progress (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references public.children on delete cascade not null,
  topic_id uuid references public.topics on delete cascade not null,
  questions_answered int not null default 0,
  questions_correct int not null default 0,
  last_question_index int not null default 0,
  score_pct numeric(5,2) not null default 0,
  completed_at timestamptz,
  cert_earned_at timestamptz,
  streak_days int not null default 0,
  updated_at timestamptz default now(),
  unique (child_id, topic_id)
);
alter table public.progress enable row level security;
create policy "Child owner can read/write progress" on public.progress
  using (
    child_id in (select id from public.children where parent_id = auth.uid())
  );

-- Answer log
create table public.answer_log (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references public.children on delete cascade not null,
  question_id uuid references public.questions on delete cascade not null,
  answer_given text not null,
  is_correct boolean not null,
  time_taken_ms int,
  answered_at timestamptz default now()
);
alter table public.answer_log enable row level security;
create policy "Child owner can insert answer_log" on public.answer_log
  for insert with check (
    child_id in (select id from public.children where parent_id = auth.uid())
  );

-- Achievements
create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references public.children on delete cascade not null,
  type text not null check (type in ('badge', 'topic_cert', 'genius_cert')),
  topic_id uuid references public.topics,
  earned_at timestamptz default now(),
  share_token text not null unique default encode(gen_random_bytes(16), 'hex')
);
alter table public.achievements enable row level security;
create policy "Child owner can read achievements" on public.achievements
  for select using (
    child_id in (select id from public.children where parent_id = auth.uid())
  );

-- Purchases
create table public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users on delete cascade not null,
  stripe_session_id text not null unique,
  amount int not null,
  currency text not null default 'usd',
  type text not null check (type in ('family', 'school')),
  purchased_at timestamptz default now()
);
alter table public.purchases enable row level security;
create policy "User can read own purchases" on public.purchases
  for select using (auth.uid() = user_id);

-- Topics and questions are seeded/read-only — allow public SELECT
alter table public.topics enable row level security;
create policy "Topics are publicly readable" on public.topics for select using (true);

alter table public.questions enable row level security;
create policy "Questions are publicly readable" on public.questions for select using (true);

-- Seed: 10 topics in order
insert into public.topics (order_index, title, icon, tier) values
  (1,  'Logic & Boolean Algebra',    '⚡', 'foundation'),
  (2,  'Algorithmic Thinking',       '🔁', 'foundation'),
  (3,  'Data Structures',            '🗂️', 'foundation'),
  (4,  'Machine Learning Basics',    '🧠', 'foundation'),
  (5,  'Neural Networks',            '🕸️', 'intermediate'),
  (6,  'Natural Language Processing','💬', 'intermediate'),
  (7,  'Computer Vision',            '👁️', 'intermediate'),
  (8,  'Data Ethics & Privacy',      '🔒', 'intermediate'),
  (9,  'Robotics & Automation',      '🤖', 'advanced'),
  (10, 'Generative AI',              '✨', 'advanced');
