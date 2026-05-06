# Supabase Database Schema for Portfolio

## Setup Instructions

1. Create a new Supabase project at https://supabase.com
2. Get your `Project URL` and `anon public` API key from Project Settings > API
3. Run the SQL below in the SQL Editor
4. Add your credentials to the `.env` file

## Environment Variables

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Tables

Run this SQL in Supabase SQL Editor:

```sql
-- Enable Row Level Security
alter table if exists site_settings enable row level security;
alter table if exists projects enable row level security;
alter table if exists skills enable row level security;
alter table if exists experiences enable row level security;
alter table if exists services enable row level security;
alter table if exists principles enable row level security;
alter table if exists social_links enable row level security;
alter table if exists featured_projects enable row level security;

-- Site Settings Table (global settings, contact info, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  value_type TEXT DEFAULT 'text', -- 'text', 'number', 'boolean', 'json'
  category TEXT DEFAULT 'general', -- 'general', 'contact', 'home', 'about'
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  description TEXT NOT NULL,
  image TEXT,
  size TEXT DEFAULT 'normal', -- 'normal' or 'large'
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL, -- 'Frontend Development', 'Design & UI/UX', 'Backend & Tools'
  name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Experiences Table (Timeline)
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT,
  date_range TEXT NOT NULL, -- e.g., "2021 — PRESENT"
  description TEXT NOT NULL,
  is_current BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Services Table (Home page services)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  icon TEXT NOT NULL, -- Material symbol name
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Principles Table (About page core principles)
CREATE TABLE IF NOT EXISTS principles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  icon TEXT NOT NULL, -- Material symbol name
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL, -- 'twitter', 'linkedin', 'github', 'dribbble', etc.
  url TEXT NOT NULL,
  display_name TEXT,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Featured Projects Table (for home page preview)
CREATE TABLE IF NOT EXISTS featured_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  is_featured BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS Policies for Public Read Access
CREATE POLICY "Allow public read access on site_settings" 
  ON site_settings FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Allow public read access on projects" 
  ON projects FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Allow public read access on skills" 
  ON skills FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Allow public read access on experiences" 
  ON experiences FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Allow public read access on services" 
  ON services FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Allow public read access on principles" 
  ON principles FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Allow public read access on social_links" 
  ON social_links FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Allow public read access on featured_projects" 
  ON featured_projects FOR SELECT 
  TO anon, authenticated 
  USING (true);

-- RLS Policies for Admin Write Access (authenticated users only)
CREATE POLICY "Allow authenticated users to insert site_settings" 
  ON site_settings FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update site_settings" 
  ON site_settings FOR UPDATE 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to insert projects" 
  ON projects FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update projects" 
  ON projects FOR UPDATE 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete projects" 
  ON projects FOR DELETE 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users to insert skills" 
  ON skills FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update skills" 
  ON skills FOR UPDATE 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete skills" 
  ON skills FOR DELETE 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users to insert experiences" 
  ON experiences FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update experiences" 
  ON experiences FOR UPDATE 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete experiences" 
  ON experiences FOR DELETE 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users to insert services" 
  ON services FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update services" 
  ON services FOR UPDATE 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete services" 
  ON services FOR DELETE 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users to insert principles" 
  ON principles FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update principles" 
  ON principles FOR UPDATE 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete principles" 
  ON principles FOR DELETE 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users to insert social_links" 
  ON social_links FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update social_links" 
  ON social_links FOR UPDATE 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete social_links" 
  ON social_links FOR DELETE 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users to insert featured_projects" 
  ON featured_projects FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update featured_projects" 
  ON featured_projects FOR UPDATE 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete featured_projects" 
  ON featured_projects FOR DELETE 
  TO authenticated 
  USING (true);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at 
  BEFORE UPDATE ON site_settings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at 
  BEFORE UPDATE ON skills 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at 
  BEFORE UPDATE ON experiences 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at 
  BEFORE UPDATE ON services 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_principles_updated_at 
  BEFORE UPDATE ON principles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at 
  BEFORE UPDATE ON social_links 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_featured_projects_updated_at 
  BEFORE UPDATE ON featured_projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

## Authentication Setup

1. Go to Authentication > Providers in Supabase Dashboard
2. Enable **Email** provider
3. Disable "Confirm email" for easier testing (or keep it enabled for production)
4. Create your admin user in Authentication > Users > Add User

## Sample Data (Optional)

```sql
-- Site Settings (all editable content)
INSERT INTO site_settings (key, value, value_type, category, description) VALUES
-- General Settings
('site_name', 'Portfolio', 'text', 'general', 'Brand/Site name'),
('site_year', '2024', 'text', 'general', 'Copyright year'),
('availability_status', 'AVAILABLE FOR NEW PROJECTS', 'text', 'general', 'Availability badge text'),

-- Home Page Settings
('home_hero_title', 'I help people grow, create, and build impactful work', 'text', 'home', 'Home hero title'),
('home_hero_subtitle', 'A multidisciplinary designer and strategist focused on building scalable digital solutions that bridge the gap between human needs and business goals.', 'text', 'home', 'Home hero subtitle'),
('home_about_title', 'Built on a foundation of clarity and purpose.', 'text', 'home', 'About preview title'),
('home_about_paragraph1', 'I believe that the best work happens at the intersection of rigorous logic and creative intuition. Over the last decade, I''ve partnered with startups and Fortune 500 companies to launch products that matter.', 'text', 'home', 'About preview paragraph 1'),
('home_about_paragraph2', 'My approach is deeply rooted in research, ensuring every pixel and every line of code serves a specific objective for your brand.', 'text', 'home', 'About preview paragraph 2'),
('home_years_experience', '8+', 'text', 'home', 'Years of experience'),
('home_projects_completed', '120+', 'text', 'home', 'Projects completed'),
('home_client_satisfaction', '98%', 'text', 'home', 'Client satisfaction'),
('home_profile_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPfBjzggWJyHNvz_Kk3xHGkAaFTcjB_PazInhiiYvQzSZdqkhZIfk6UqQP_DrOtgFqTmhoxTbbgEX0_x13BImz9NAKc2LbHWDaVqwc_bzM3vj_oCvvubXmTqagn2FiNspFALYDLYNQe_3zcU69xQbOj9nHCgKPk3qXehtQsk6YiyWsTneCxEy9O2ndDuqJn55e8FMGFYviaHEZPv1chN9N6KQq7Xj8Sv734o-cy1h652XINqybKGhrZGsxdAi-Eow_x0-4mGT2fmM', 'text', 'home', 'Profile image URL'),
('home_services_title', 'How I add value', 'text', 'home', 'Services section title'),
('home_services_subtitle', 'Focused services designed to propel your business forward in the digital age.', 'text', 'home', 'Services section subtitle'),
('home_cta_title', 'Let''s work together', 'text', 'home', 'CTA section title'),
('home_cta_subtitle', 'Have a project in mind? Let''s discuss how we can build something truly impactful for your brand.', 'text', 'home', 'CTA section subtitle'),
('home_cta_button_text', 'Contact Me', 'text', 'home', 'CTA button text'),
('home_cta_secondary_button_text', 'Book a Call', 'text', 'home', 'CTA secondary button text'),

-- About Page Settings
('about_hero_badge', 'Design Philosophy', 'text', 'about', 'About hero badge'),
('about_hero_title', 'My mission is to build digital products that matter.', 'text', 'about', 'About hero title'),
('about_hero_subtitle', 'I blend strategic thinking with meticulous design to create experiences that solve real human problems and drive business growth.', 'text', 'about', 'About hero subtitle'),
('about_portrait_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE-n7xURPoyO53HTmsNKgvXOZQNbIh2b1T-Cyg_ARFfsH5iNr3CGiLj3GyjIkd6KA-IJxwAQacrI9yZwRVEp4yFbaIZDUZv4KEXlBNgOz6RK-nb8upG5H-RfBScs-1jZk-gEiaP6b5B4AlV7LwHUSY6tQG2cm_zDlHLTbqvo_yjpif6QRlMUFglYWoPilMKl6WTtSBXIKYSL8di8eMAXP1WnnWwc8mAlZ47BEvRpQl_DtfFiLXPeOd6MLdsAtAMapn00unh6FuRnE', 'text', 'about', 'Portrait image URL'),
('about_story_title', 'My Story', 'text', 'about', 'Story section title'),
('about_story_paragraph1', 'It all started with a curiosity for how humans interact with technology. My journey began in a small workspace, surrounded by sketchbooks and early versions of design software. What began as a hobby quickly evolved into a lifelong pursuit of perfection in the digital realm.', 'text', 'about', 'Story paragraph 1'),
('about_story_paragraph2', 'Over the past decade, I''ve navigated the evolving landscape of digital product design. From the early days of mobile-first revolutions to the current age of AI-integrated interfaces, I''ve consistently focused on one thing: the human at the other end of the screen.', 'text', 'about', 'Story paragraph 2'),
('about_story_paragraph3', 'Today, I consult for high-growth startups and established enterprises, helping them bridge the gap between complex technology and intuitive user experience.', 'text', 'about', 'Story paragraph 3'),
('about_principles_title', 'Core Principles', 'text', 'about', 'Principles section title'),
('about_principles_subtitle', 'The values that anchor my work and drive every creative decision.', 'text', 'about', 'Principles section subtitle'),
('about_timeline_title', 'Professional Timeline', 'text', 'about', 'Timeline section title'),
('about_cta_title', 'Want to know more or collaborate?', 'text', 'about', 'About CTA title'),
('about_cta_button_primary', 'Get In Touch', 'text', 'about', 'About CTA primary button'),
('about_cta_button_secondary', 'Download CV', 'text', 'about', 'About CTA secondary button'),

-- Contact Page Settings
('contact_availability', 'AVAILABLE FOR NEW PROJECTS', 'text', 'contact', 'Contact availability badge'),
('contact_hero_title', 'Let''s build something great together.', 'text', 'contact', 'Contact hero title'),
('contact_hero_subtitle', 'I''m currently looking for new opportunities and collaborations. Whether you have a specific project in mind or just want to say hi, my inbox is always open.', 'text', 'contact', 'Contact hero subtitle'),
('contact_email', 'hello@portfolio.com', 'text', 'contact', 'Contact email'),
('contact_location', 'Germany', 'text', 'contact', 'Contact location'),
('contact_whatsapp_title', 'Direct Chat', 'text', 'contact', 'WhatsApp title'),
('contact_whatsapp_subtitle', 'Get a faster response via WhatsApp', 'text', 'contact', 'WhatsApp subtitle'),
('contact_whatsapp_url', '', 'text', 'contact', 'WhatsApp URL'),
('contact_response_time', 'I usually respond within 24-48 business hours.', 'text', 'contact', 'Response time message'),

-- Navigation Settings
('nav_brand_name', 'Portfolio', 'text', 'general', 'Navigation brand name'),
('nav_button_text', 'Hire Me', 'text', 'general', 'Navigation button text');

-- Sample Projects
INSERT INTO projects (title, category, subcategory, description, image, size, display_order) VALUES
('Nexus Wealth Management', 'FinTech', 'UI/UX Design', 'Redefining digital asset management with a focus on institutional-grade security and intuitive performance tracking.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuArcIpc2fncbp9VmTAnLTqxOBOvb6AaA5AKnDMhUUTyBHPlwTW7v9k89r6F3JfzSSBnsWiWBnBVhNOUm-TCeJSO2GYjKrknJVr1BX9uhQvNcaasBi-rIpnJgGU1kQsrisuCP5bxxf6WQ9S_ry8q7YQ_sAiOq9KFRRTUOTWrrdUrqFNPvknJXzpU1Aa_scjTHn4VvIbMHJU3f6duUJWiDtmA-HF9_qG4YCKeW5nWITzTEQ-UvWKmMgWQfglD50vfUHAAMT9LkFAgTB4', 'normal', 1),
('Vigor AI', 'Healthcare', 'Artificial Intelligence', 'An AI-driven diagnostic platform that streamlines patient data analysis for modern healthcare providers.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOocsSC3_LIC7zel4DbpZCZ-rBZOGPK4bpRcePPwap-HuAJ1ZJj8gamom15qoWHCvFr6WbW-lVcqFQ86p4o9GrAa207HJ0Cf0-fKo4OL-z6vK7nVpWhoexa98eUUc2SCqeFC9DtBGGbYkbRKcjmQUBcED2mkuaIi1SNDid7pZheWJc7aFmhEYfIXA5QERE-rxhSrjcekKHVP4bPyD4C4_zMH6xrQO210O9hGAIRhRsseZMW0iQQK5ZjieyUt4ARyQSWyNO1mBqmvs', 'normal', 2),
('CloudScale Systems', 'SaaS', 'Architecture', 'Scalable infrastructure monitoring for enterprise organizations, focusing on real-time data visibility and system health.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdNfTl6NmyTK_o3NUxA646ZLF-LSul3ghNVuyaBE3js0n3Pt-ueuwVZkhW4aqb46uwG9tVQARyjeuGvYg_tBCkANgn3dhv6Ai7ZPDvgBrz0jHubrFfIvzVlEKFk59GrjJ40B_CunRA8qk0FYeXczhxoalEYGsuHkTLSPnSKH1k8dP85jhhISvT1HoqAokojZsG59pDaObkufQ-EPuywn6Zr0Kg-LgFJNVnJuHWKm0H9NWb-bUTmmO53I1w8gmX104hNtJs8KiE2Sg', 'large', 3);

-- Sample Skills
INSERT INTO skills (category, name, display_order) VALUES
('Frontend Development', 'React & Redux', 1),
('Frontend Development', 'HTML5 & CSS3', 2),
('Frontend Development', 'JavaScript (ES6+)', 3),
('Frontend Development', 'Tailwind CSS', 4),
('Frontend Development', 'Vite & Webpack', 5),
('Design & UI/UX', 'Figma & Adobe XD', 6),
('Design & UI/UX', 'Wireframing & Prototyping', 7),
('Design & UI/UX', 'Design Systems', 8),
('Design & UI/UX', 'Responsive Web Design', 9),
('Design & UI/UX', 'Accessibility (WCAG)', 10),
('Backend & Tools', 'Node.js & Express', 11),
('Backend & Tools', 'Git & GitHub', 12),
('Backend & Tools', 'RESTful APIs', 13),
('Backend & Tools', 'Firebase & Supabase', 14),
('Backend & Tools', 'Vercel & Netlify', 15);

-- Sample Experiences
INSERT INTO experiences (title, company, date_range, description, is_current, display_order) VALUES
('Senior Designer', 'TechCorp', '2021 — PRESENT', 'Leading the design system team and overseeing the UX strategy for our core SaaS product.', true, 1),
('Freelance Consultant', NULL, '2018 — 2021', 'Partnered with series-A startups to build their initial MVPs and establish foundations.', false, 2),
('Junior UI Designer', 'Creative Agency', '2015 — 2018', 'Starting as a junior UI designer at a creative agency, learning the fundamentals.', false, 3);

-- Sample Services
INSERT INTO services (title, icon, description, display_order) VALUES
('Web Design', 'brush', 'Creating intuitive, high-converting digital experiences that prioritize behavior and brand authority.', 1),
('AI Solutions', 'psychology', 'Integrating smart automation and machine learning models to streamline operations and enhance products.', 2),
('Content Creation', 'campaign', 'Strategic storytelling and brand messaging that builds trust and drives long-term community growth.', 3);

-- Sample Principles
INSERT INTO principles (title, icon, description, display_order) VALUES
('User-Centric Design', 'groups', 'Putting the user at the heart of every decision, ensuring solutions are intuitive and valuable.', 1),
('Strategic Thinking', 'strategy', 'Design is more than aesthetics. It''s a strategic tool used to solve complex challenges.', 2),
('Continuous Learning', 'school', 'I am committed to constant growth, new tools, and evolving methodologies.', 3);

-- Sample Social Links
INSERT INTO social_links (platform, url, display_name, display_order, is_visible) VALUES
('twitter', 'https://twitter.com/yourhandle', 'Twitter', 1, true),
('linkedin', 'https://linkedin.com/in/yourprofile', 'LinkedIn', 2, true),
('github', 'https://github.com/yourusername', 'GitHub', 3, true),
('dribbble', 'https://dribbble.com/yourusername', 'Dribbble', 4, true);
```

## Storage Setup (For Images)

1. Go to Storage in Supabase Dashboard
2. Create a new bucket called `project-images`
3. Set bucket to public
4. Add policy to allow public read:

```sql
CREATE POLICY "Allow public read access on project-images" 
  ON storage.objects FOR SELECT 
  TO anon, authenticated 
  USING (bucket_id = 'project-images');

CREATE POLICY "Allow authenticated upload on project-images" 
  ON storage.objects FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'project-images');
```

## API Endpoints

The Supabase client provides these methods:

- `supabase.from('projects').select('*')` - Get all projects
- `supabase.from('projects').insert(data)` - Create project
- `supabase.from('projects').update(data).eq('id', id)` - Update project
- `supabase.from('projects').delete().eq('id', id)` - Delete project
- `supabase.auth.signInWithPassword(credentials)` - Login
- `supabase.auth.signOut()` - Logout
- `supabase.auth.getSession()` - Get current session/JWT

## Complete List of Editable Content

### Site Settings (via site_settings table)
**General Settings:**
- Site name/brand name
- Copyright year
- Availability status badge text
- Navigation brand name
- Navigation button text

**Home Page:**
- Hero title and subtitle
- About preview title and paragraphs
- Profile image URL
- Years of experience
- Projects completed count
- Client satisfaction percentage
- Services section title and subtitle
- CTA section title, subtitle, and button texts

**About Page:**
- Hero badge, title, and subtitle
- Portrait image URL
- Story section title and paragraphs
- Principles section title and subtitle
- Timeline section title
- CTA section title and button texts

**Contact Page:**
- Availability badge
- Hero title and subtitle
- Email address
- Location
- WhatsApp title, subtitle, and URL
- Response time message

### Projects (via projects table)
- Project title
- Category
- Subcategory
- Description
- Image URL
- Size (normal/large)
- Display order

### Skills (via skills table)
- Skill category (Frontend Development, Design & UI/UX, Backend & Tools)
- Skill name
- Display order

### Experiences/Timeline (via experiences table)
- Job title
- Company name
- Date range
- Description
- Is current (boolean)
- Display order

### Services (via services table)
- Service title
- Icon (Material symbol name)
- Description
- Display order

### Core Principles (via principles table)
- Principle title
- Icon (Material symbol name)
- Description
- Display order

### Social Links (via social_links table)
- Platform name (twitter, linkedin, github, dribbble, etc.)
- URL
- Display name
- Display order
- Visibility (show/hide)
