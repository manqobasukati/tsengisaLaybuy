import { createClient } from '@supabase/supabase-js'

const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4dmtjeW9waGVsZ3Z4bGFvbHJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMjQ2NDQsImV4cCI6MjAzMTgwMDY0NH0.5JiAYSLM4huh7l8u_A8OuND3eI_lnmP9m5wzA2nLT-I'
const connectionUrl = 'https://bxvkcyophelgvxlaolrp.supabase.co'
 export const supabase = createClient(connectionUrl, anonKey);




