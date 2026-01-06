import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sjrhtmxxumrzfcenoqgb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcmh0bXh4dW1yemZjZW5vcWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MTAyODIsImV4cCI6MjA4MjA4NjI4Mn0.aoRZAEHYjTjQMV2MwAzwZA-hfxFi2JHXNKPgvTV2SgA'

export const supabase = createClient(supabaseUrl, supabaseKey)