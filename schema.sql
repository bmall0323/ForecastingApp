-- Clients and Users
create table clients (
  id uuid primary key default gen_random_uuid(),
  name text,
  region text
);

create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  client_id uuid references clients(id)
);

-- Store Locations
create table stores (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  name text,
  zip_code text
);

-- Product Information
create table products (
  id uuid primary key default gen_random_uuid(),
  sku text,
  name text,
  category text,
  list_price numeric,
  lifecycle_stage text
);

-- Sales Data
create table sales (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references stores(id),
  product_id uuid references products(id),
  sale_date date,
  quantity int,
  net_sales numeric,
  returns int,
  channel text
);
