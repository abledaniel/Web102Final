import { createClient } from "@supabase/supabase-js"

const URL = 'https://qauucuxfwyrpztvxhqmr.supabase.co'

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhdXVjdXhmd3lycHp0dnhocW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NTk2NTQsImV4cCI6MjA0NzMzNTY1NH0.gSXH1sCPtXQFYVB9mMkl7vraVLoN9lG33CHmhNQtBDQ'

export const supabase = createClient(URL, API_KEY);