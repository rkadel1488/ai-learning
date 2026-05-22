export type UserRole = 'parent' | 'teacher'
export type Track = 'story' | 'levels' | 'sandbox'
export type Tier = 'foundation' | 'intermediate' | 'advanced'
export type QuestionType = 'mcq' | 'drag_drop' | 'chat' | 'build' | 'story_choice'
export type PurchaseType = 'family' | 'school'
export type AchievementType = 'badge' | 'topic_cert' | 'genius_cert'

export type Database = {
  public: {
    Tables: {
      users: {
        Row: { id: string; email: string; role: UserRole; name: string | null; created_at: string }
        Insert: { id: string; email: string; role: UserRole; name?: string | null }
        Update: { name?: string | null; role?: UserRole }
      }
      children: {
        Row: { id: string; parent_id: string; name: string; age: number; track: Track; created_at: string }
        Insert: { parent_id: string; name: string; age: number; track: Track }
        Update: { name?: string; age?: number; track?: Track }
      }
      topics: {
        Row: { id: string; order_index: number; title: string; icon: string; tier: Tier }
        Insert: { order_index: number; title: string; icon: string; tier: Tier }
        Update: never
      }
      purchases: {
        Row: { id: string; user_id: string; stripe_session_id: string; amount: number; currency: string; type: PurchaseType; purchased_at: string }
        Insert: { user_id: string; stripe_session_id: string; amount: number; currency?: string; type: PurchaseType }
        Update: never
      }
    }
  }
}
