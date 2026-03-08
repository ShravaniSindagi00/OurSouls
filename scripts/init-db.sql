-- Create users table with wellness profile
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  user_type TEXT DEFAULT 'patient' CHECK (user_type IN ('patient', 'therapist', 'admin')),
  wellness_goals TEXT[] DEFAULT ARRAY[]::TEXT[],
  mood_score INT DEFAULT 50,
  updated_at TIMESTAMP DEFAULT now()
);

-- Create therapists table
CREATE TABLE IF NOT EXISTS therapists (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  specializations TEXT[] NOT NULL,
  bio TEXT,
  hourly_rate INT,
  availability_schedule JSONB DEFAULT '{}'::jsonb,
  google_meet_url TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  total_sessions INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INT DEFAULT 60,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  google_meet_link TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Create mood logs table for dashboard tracking
CREATE TABLE IF NOT EXISTS mood_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mood_score INT NOT NULL CHECK (mood_score >= 1 AND mood_score <= 10),
  energy_level INT CHECK (energy_level >= 1 AND energy_level <= 10),
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Create session summaries table (AI-generated)
CREATE TABLE IF NOT EXISTS session_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  summary TEXT,
  key_points TEXT[],
  action_steps TEXT[],
  created_at TIMESTAMP DEFAULT now()
);

-- Create community posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_therapist_id ON appointments(therapist_id);
CREATE INDEX IF NOT EXISTS idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_mood_logs_user_id ON mood_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_logs_created_at ON mood_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- RLS Policies for therapists (public read, therapist edit own)
CREATE POLICY "Anyone can view therapist profiles" ON therapists
  FOR SELECT USING (true);

CREATE POLICY "Therapists can update their own profile" ON therapists
  FOR UPDATE USING (auth.uid()::text = id::text);

-- RLS Policies for appointments
CREATE POLICY "Users can view their own appointments" ON appointments
  FOR SELECT USING (auth.uid()::text = user_id::text OR auth.uid()::text = therapist_id::text);

CREATE POLICY "Users can create appointments" ON appointments
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their appointments" ON appointments
  FOR UPDATE USING (auth.uid()::text = user_id::text OR auth.uid()::text = therapist_id::text);

-- RLS Policies for mood logs
CREATE POLICY "Users can view their own mood logs" ON mood_logs
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own mood logs" ON mood_logs
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- RLS Policies for posts
CREATE POLICY "Anyone can view posts" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Users can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own posts" ON posts
  FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own posts" ON posts
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- RLS Policies for comments
CREATE POLICY "Anyone can view comments" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (auth.uid()::text = user_id::text);
