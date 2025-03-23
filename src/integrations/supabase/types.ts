export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_data: {
        Row: {
          created_at: string
          id: string
          intensity: number | null
          minutes: number
          time: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          intensity?: number | null
          minutes: number
          time?: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          intensity?: number | null
          minutes?: number
          time?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      diet_data: {
        Row: {
          created_at: string
          id: string
          meal_name: string | null
          quality: number | null
          time: string
          user_id: string
          water: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          meal_name?: string | null
          quality?: number | null
          time?: string
          user_id: string
          water?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          meal_name?: string | null
          quality?: number | null
          time?: string
          user_id?: string
          water?: number | null
        }
        Relationships: []
      }
      sleep_data: {
        Row: {
          created_at: string
          hours: number
          id: string
          quality: number | null
          time: string
          user_id: string
        }
        Insert: {
          created_at?: string
          hours: number
          id?: string
          quality?: number | null
          time?: string
          user_id: string
        }
        Update: {
          created_at?: string
          hours?: number
          id?: string
          quality?: number | null
          time?: string
          user_id?: string
        }
        Relationships: []
      }
      stress_data: {
        Row: {
          created_at: string
          id: string
          level: number | null
          notes: string | null
          time: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          level?: number | null
          notes?: string | null
          time?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          level?: number | null
          notes?: string | null
          time?: string
          user_id?: string
        }
        Relationships: []
      }
      Sypher2: {
        Row: {
          created_at: string
          created_by: string
          id: number
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: number
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_sample_health_data: {
        Args: {
          user_uuid: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
