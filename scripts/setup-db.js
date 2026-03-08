import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('[v0] Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('[v0] Starting database setup...');

    // Create users table
    const { error: usersError } = await supabase.from('users').select('count()').limit(0);
    if (usersError?.code === 'PGRST116') {
      console.log('[v0] Creating users table...');
      const { error } = await supabase.rpc('exec', {
        sql: `
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
          ALTER TABLE users ENABLE ROW LEVEL SECURITY;
          CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
          CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);
        `
      });
      if (error) console.error('[v0] Error creating users table:', error);
      else console.log('[v0] Users table created');
    } else {
      console.log('[v0] Users table already exists');
    }

    // Create therapists table
    const { error: therapistsError } = await supabase.from('therapists').select('count()').limit(0);
    if (therapistsError?.code === 'PGRST116') {
      console.log('[v0] Creating therapists table...');
      const { error } = await supabase.rpc('exec', {
        sql: `
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
          ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;
          CREATE POLICY "Anyone can view therapist profiles" ON therapists FOR SELECT USING (true);
          CREATE POLICY "Therapists can update their own profile" ON therapists FOR UPDATE USING (auth.uid()::text = id::text);
        `
      });
      if (error) console.error('[v0] Error creating therapists table:', error);
      else console.log('[v0] Therapists table created');
    } else {
      console.log('[v0] Therapists table already exists');
    }

    // Create appointments table
    const { error: appointmentsError } = await supabase.from('appointments').select('count()').limit(0);
    if (appointmentsError?.code === 'PGRST116') {
      console.log('[v0] Creating appointments table...');
      const { error } = await supabase.rpc('exec', {
        sql: `
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
          CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
          CREATE INDEX IF NOT EXISTS idx_appointments_therapist_id ON appointments(therapist_id);
          ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
          CREATE POLICY "Users can view their own appointments" ON appointments FOR SELECT USING (auth.uid()::text = user_id::text OR auth.uid()::text = therapist_id::text);
          CREATE POLICY "Users can create appointments" ON appointments FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
        `
      });
      if (error) console.error('[v0] Error creating appointments table:', error);
      else console.log('[v0] Appointments table created');
    } else {
      console.log('[v0] Appointments table already exists');
    }

    // Create mood_logs table
    const { error: moodLogsError } = await supabase.from('mood_logs').select('count()').limit(0);
    if (moodLogsError?.code === 'PGRST116') {
      console.log('[v0] Creating mood_logs table...');
      const { error } = await supabase.rpc('exec', {
        sql: `
          CREATE TABLE IF NOT EXISTS mood_logs (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            mood_score INT NOT NULL CHECK (mood_score >= 1 AND mood_score <= 10),
            energy_level INT CHECK (energy_level >= 1 AND energy_level <= 10),
            notes TEXT,
            created_at TIMESTAMP DEFAULT now()
          );
          CREATE INDEX IF NOT EXISTS idx_mood_logs_user_id ON mood_logs(user_id);
          ALTER TABLE mood_logs ENABLE ROW LEVEL SECURITY;
          CREATE POLICY "Users can view their own mood logs" ON mood_logs FOR SELECT USING (auth.uid()::text = user_id::text);
          CREATE POLICY "Users can insert their own mood logs" ON mood_logs FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
        `
      });
      if (error) console.error('[v0] Error creating mood_logs table:', error);
      else console.log('[v0] Mood logs table created');
    } else {
      console.log('[v0] Mood logs table already exists');
    }

    // Create session_summaries table
    const { error: sessionsError } = await supabase.from('session_summaries').select('count()').limit(0);
    if (sessionsError?.code === 'PGRST116') {
      console.log('[v0] Creating session_summaries table...');
      const { error } = await supabase.rpc('exec', {
        sql: `
          CREATE TABLE IF NOT EXISTS session_summaries (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
            summary TEXT,
            key_points TEXT[],
            action_steps TEXT[],
            created_at TIMESTAMP DEFAULT now()
          );
          ALTER TABLE session_summaries ENABLE ROW LEVEL SECURITY;
        `
      });
      if (error) console.error('[v0] Error creating session_summaries table:', error);
      else console.log('[v0] Session summaries table created');
    } else {
      console.log('[v0] Session summaries table already exists');
    }

    // Create posts table
    const { error: postsError } = await supabase.from('posts').select('count()').limit(0);
    if (postsError?.code === 'PGRST116') {
      console.log('[v0] Creating posts table...');
      const { error } = await supabase.rpc('exec', {
        sql: `
          CREATE TABLE IF NOT EXISTS posts (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now()
          );
          CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
          ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
          CREATE POLICY "Anyone can view posts" ON posts FOR SELECT USING (true);
          CREATE POLICY "Users can create posts" ON posts FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
          CREATE POLICY "Users can update their own posts" ON posts FOR UPDATE USING (auth.uid()::text = user_id::text);
          CREATE POLICY "Users can delete their own posts" ON posts FOR DELETE USING (auth.uid()::text = user_id::text);
        `
      });
      if (error) console.error('[v0] Error creating posts table:', error);
      else console.log('[v0] Posts table created');
    } else {
      console.log('[v0] Posts table already exists');
    }

    // Create comments table
    const { error: commentsError } = await supabase.from('comments').select('count()').limit(0);
    if (commentsError?.code === 'PGRST116') {
      console.log('[v0] Creating comments table...');
      const { error } = await supabase.rpc('exec', {
        sql: `
          CREATE TABLE IF NOT EXISTS comments (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT now()
          );
          CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
          ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
          CREATE POLICY "Anyone can view comments" ON comments FOR SELECT USING (true);
          CREATE POLICY "Users can create comments" ON comments FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
          CREATE POLICY "Users can delete their own comments" ON comments FOR DELETE USING (auth.uid()::text = user_id::text);
        `
      });
      if (error) console.error('[v0] Error creating comments table:', error);
      else console.log('[v0] Comments table created');
    } else {
      console.log('[v0] Comments table already exists');
    }

    console.log('[v0] Database setup completed successfully!');
  } catch (error) {
    console.error('[v0] Fatal error during database setup:', error);
    process.exit(1);
  }
}

setupDatabase();
