import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tndzlopancnijmzksdhh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZHpsb3BhbmNuaWptemtzZGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNzk2NjUsImV4cCI6MjA2NTg1NTY2NX0.qdxuZkDUJs-9nY9yCywXJzZ7Dr8K3ezrvf-y7Wpo5ig'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    // Add these additional options
    storageKey: 'supabase-auth-token',
    flowType: 'implicit',
  },
})