-- Make stripe_session_id nullable (eSewa payments don't use Stripe)
alter table public.purchases
  alter column stripe_session_id drop not null;

-- Add esewa to purchases type constraint
alter table public.purchases
  drop constraint if exists purchases_type_check;
alter table public.purchases
  add constraint purchases_type_check check (type in ('family', 'school', 'esewa'));

-- Payment requests table for eSewa manual verification flow
create table if not exists public.payment_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reference_code text not null unique,
  amount int not null default 1000,
  currency text not null default 'NPR',
  status text not null default 'pending'
    check (status in ('pending', 'uploaded', 'approved', 'rejected')),
  analysis_notes text,
  created_at timestamptz default now(),
  reviewed_at timestamptz
);

alter table public.payment_requests enable row level security;

create policy "users manage own payment requests"
  on public.payment_requests
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
