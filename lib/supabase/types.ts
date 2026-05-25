export type UserRole = 'parent' | 'teacher'
export type Track = 'story' | 'levels' | 'sandbox'
export type Tier = 'foundation' | 'intermediate' | 'advanced'
export type QuestionType = 'mcq' | 'drag_drop' | 'chat' | 'build' | 'story_choice'
export type PurchaseType = 'family' | 'school' | 'esewa'
export type PaymentStatus = 'pending' | 'uploaded' | 'approved' | 'rejected'
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
        Row: { id: string; user_id: string; stripe_session_id: string | null; amount: number; currency: string; type: PurchaseType; purchased_at: string }
        Insert: { user_id: string; stripe_session_id?: string | null; amount: number; currency?: string; type: PurchaseType }
        Update: { user_id?: string; stripe_session_id?: string | null; amount?: number; currency?: string; type?: PurchaseType }
        Relationships: []
      }
      payment_requests: {
        Row: { id: string; user_id: string; reference_code: string; amount: number; currency: string; status: PaymentStatus; analysis_notes: string | null; created_at: string; reviewed_at: string | null }
        Insert: { user_id: string; reference_code: string; amount?: number; currency?: string; status?: PaymentStatus }
        Update: { status?: PaymentStatus; analysis_notes?: string | null; reviewed_at?: string | null }
        Relationships: []
      }
      questions: {
        Row: { id: string; topic_id: string; track: Track; type: QuestionType; order_index: number; prompt: string; options: string[]; correct_answer: string; explanation: string; is_free: boolean; created_at: string }
        Insert: { topic_id: string; track: Track; type: QuestionType; order_index: number; prompt: string; options: string[]; correct_answer: string; explanation: string; is_free?: boolean }
        Update: { topic_id?: string; track?: Track; type?: QuestionType; order_index?: number; prompt?: string; options?: string[]; correct_answer?: string; explanation?: string; is_free?: boolean }
        Relationships: []
      }
      progress: {
        Row: { id: string; child_id: string; topic_id: string; questions_answered: number; questions_correct: number; last_question_index: number; score_pct: number; completed_at: string | null; cert_earned_at: string | null; streak_days: number; updated_at: string }
        Insert: { child_id: string; topic_id: string; questions_answered?: number; questions_correct?: number; last_question_index?: number; score_pct?: number; completed_at?: string | null; cert_earned_at?: string | null; streak_days?: number; updated_at?: string }
        Update: { questions_answered?: number; questions_correct?: number; last_question_index?: number; score_pct?: number; completed_at?: string | null; cert_earned_at?: string | null; streak_days?: number; updated_at?: string }
        Relationships: []
      }
      achievements: {
        Row: { id: string; child_id: string; type: AchievementType; topic_id: string | null; earned_at: string; share_token: string }
        Insert: { child_id: string; type: AchievementType; topic_id?: string | null }
        Update: Record<string, never>
        Relationships: []
      }
      answer_log: {
        Row: { id: string; child_id: string; question_id: string; answer_given: string; is_correct: boolean; time_taken_ms: number; answered_at: string }
        Insert: { child_id: string; question_id: string; answer_given: string; is_correct: boolean; time_taken_ms: number }
        Update: Record<string, never>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
