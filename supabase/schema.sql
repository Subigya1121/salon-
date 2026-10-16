-- Run in the Supabase SQL editor.
create extension if not exists pgcrypto;
create or replace function set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

create table admins (id uuid primary key references auth.users on delete cascade, created_at timestamptz not null default now());
create table service_categories (id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null, sort_order int not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table services (id uuid primary key default gen_random_uuid(), category_id uuid references service_categories on delete set null, name text not null, description text, duration_minutes int, price numeric(10,2), is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table barbers (id uuid primary key default gen_random_uuid(), name text not null, role text, specialty text, bio text, photo_url text, is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table customers (id uuid primary key default gen_random_uuid(), full_name text not null, email text, phone text, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table appointments (
  id uuid primary key default gen_random_uuid(), reference text unique not null,
  customer_id uuid references customers on delete set null,
  service_name text not null, staff_name text not null,
  appointment_date date not null, appointment_time time not null,
  customer_name text not null, customer_email text not null, customer_phone text not null, note text,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled','completed')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create unique index appointments_slot_unique on appointments (staff_name, appointment_date, appointment_time) where status <> 'cancelled';
create index appointments_date_idx on appointments (appointment_date);
create table reviews (id uuid primary key default gen_random_uuid(), customer_name text not null, rating int not null check (rating between 1 and 5), body text not null, platform text, review_date date, is_published boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table gallery_images (id uuid primary key default gen_random_uuid(), category text not null, alt_text text not null, url text not null, sort_order int not null default 0, is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table business_hours (id uuid primary key default gen_random_uuid(), day_of_week int not null check (day_of_week between 0 and 6), opens time, closes time, is_closed boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table contact_messages (id uuid primary key default gen_random_uuid(), name text not null, email text not null, phone text, message text not null, created_at timestamptz not null default now(), updated_at timestamptz not null default now());

create or replace function is_admin() returns boolean language sql security definer set search_path = public stable as $$ select exists (select 1 from admins where id = auth.uid()) $$;

alter table admins enable row level security; -- no policies: nobody but the service role can read it

do $$ declare t text; begin
  foreach t in array array['service_categories','services','barbers','customers','appointments','reviews','gallery_images','business_hours','contact_messages'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "admin all" on %I for all to authenticated using (is_admin()) with check (is_admin())', t);
    execute format('create trigger set_updated_at before update on %I for each row execute function set_updated_at()', t);
  end loop;
end $$;

-- Public, read-only content
create policy "public read" on service_categories for select to anon, authenticated using (true);
create policy "public read" on services for select to anon, authenticated using (is_active);
create policy "public read" on barbers for select to anon, authenticated using (is_active);
create policy "public read" on gallery_images for select to anon, authenticated using (is_active);
create policy "public read" on business_hours for select to anon, authenticated using (true);
create policy "public read" on reviews for select to anon, authenticated using (is_published);
-- Visitors may only INSERT contact messages (never read them)
create policy "public insert" on contact_messages for insert to anon, authenticated with check (length(message) between 5 and 2000 and length(name) between 2 and 100);

-- Booking goes through functions so customer data is never readable by the public
create or replace function get_booked_slots(p_staff text, p_date date) returns table (slot text)
language sql security definer set search_path = public stable as $$
  select to_char(appointment_time, 'HH24:MI') from appointments where staff_name = p_staff and appointment_date = p_date and status <> 'cancelled'
$$;

create or replace function create_appointment(p_name text, p_email text, p_phone text, p_service text, p_staff text, p_date date, p_time time, p_note text)
returns text language plpgsql security definer set search_path = public as $$
declare ref text := upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));
begin
  if p_date < current_date then raise exception 'Date is in the past' using errcode = '22023'; end if;
  if length(trim(p_name)) not between 2 and 100 or p_email !~ '^\S+@\S+\.\S+$' or length(p_phone) not between 7 and 20 then
    raise exception 'Invalid details' using errcode = '22023';
  end if;
  insert into appointments (reference, service_name, staff_name, appointment_date, appointment_time, customer_name, customer_email, customer_phone, note)
  values (ref, p_service, p_staff, p_date, p_time, trim(p_name), lower(trim(p_email)), trim(p_phone), left(coalesce(p_note, ''), 500));
  return ref; -- a unique-slot clash raises error 23505
end $$;

revoke all on function get_booked_slots(text, date), create_appointment(text, text, text, text, text, date, time, text) from public;
grant execute on function get_booked_slots(text, date), create_appointment(text, text, text, text, text, date, time, text) to anon, authenticated;
