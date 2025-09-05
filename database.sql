-- Users
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text CHECK (role IN ('student', 'admin')) NOT NULL,
  meals_consumed integer DEFAULT 0,
  remaining_balance numeric DEFAULT 0,
  room_number text
);

-- Daily Meals
CREATE TABLE daily_meals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  date date NOT NULL,
  lunch boolean DEFAULT false,
  dinner boolean DEFAULT false,
  total_meals integer DEFAULT 0
);

-- Meal History
CREATE TABLE meal_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  date date NOT NULL,
  meal_type text CHECK (meal_type IN ('lunch', 'dinner')) NOT NULL,
  consumed boolean DEFAULT false,
  opted_out boolean DEFAULT false
);

-- Payments
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  category text CHECK (category IN ('food', 'utilities')) NOT NULL,
  type text,
  amount numeric NOT NULL,
  status text CHECK (status IN ('pending', 'approved', 'rejected')) NOT NULL,
  date date NOT NULL,
  description text
);

-- History Items
CREATE TABLE history_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  type text CHECK (type IN ('meals', 'payments')) NOT NULL,
  action text,
  amount numeric,
  date date,
  status text CHECK (status IN ('completed', 'pending', 'cancelled')) NOT NULL
);

-- Opt-Out Requests
CREATE TABLE opt_out_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  start_date date NOT NULL,
  end_date date NOT NULL,
  reason text,
  status text CHECK (status IN ('pending', 'approved', 'rejected')) NOT NULL,
  created_at timestamp DEFAULT now()
);

-- Dorm Info (single row)
CREATE TABLE dorm_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  address text,
  admin_phone text,
  support_email text
);