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
        Relationships: []
      }
      children: {
        Row: { id: string; parent_id: string; name: string; age: number; track: Track; created_at: string }
        Insert: { parent_id: string; name: string; age: number; track: Track }
        Update: { name?: string; age?: number; track?: Track }
        Relationships: []
      }
      topics: {
        Row: { id: string; order_index: number; title: string; icon: string; tier: Tier }
        Insert: { order_index: number; title: string; icon: string; tier: Tier }
        Update: { order_index?: number; title?: string; icon?: string; tier?: Tier }
        Relationships: []
      }
      classes: {
        Row: { id: string; teacher_id: string; name: string; age_group: '6-10' | '11-14' | '15-18'; join_code: string; created_at: string }
        Insert: { teacher_id: string; name: string; age_group: '6-10' | '11-14' | '15-18'; join_code: string }
        Update: { name?: string; age_group?: '6-10' | '11-14' | '15-18' }
        Relationships: []
      }
      purchases: {
        Row: { id: string; user_id: string; stripe_session_id: string; amount: number; currency: string; type: PurchaseType; purchased_at: string }
        Insert: { user_id: string; stripe_session_id: string; amount: number; currency?: string; type: PurchaseType }
        Update: { user_id?: string; stripe_session_id?: string; amount?: number; currency?: string; type?: PurchaseType }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
