import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wdfsjkdhrevvriidygoq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZnNqa2RocmV2dnJpaWR5Z29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3MjM3MTcsImV4cCI6MjA5NjI5OTcxN30.1CMhFotzGrOTi_HycfkTO_IjPVrBOBnw0m6R7Obts9s";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
