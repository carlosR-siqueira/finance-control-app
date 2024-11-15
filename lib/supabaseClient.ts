// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cqqckcnalkkxojctquub.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxcWNrY25hbGtreG9qY3RxdXViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2MjMwMjAsImV4cCI6MjA0NzE5OTAyMH0.BhL5UVnyo64eEh0DqJeKFM7dUwOVWx_7oVmEC4UrSGo';

export const supabase = createClient(supabaseUrl, supabaseKey);
