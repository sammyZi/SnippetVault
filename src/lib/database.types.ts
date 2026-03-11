export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      snippets: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          code: string
          language: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          code: string
          language: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          code?: string
          language?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "snippets_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
        Relationships: []
      }
      snippet_tags: {
        Row: {
          snippet_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          snippet_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          snippet_id?: string
          tag_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "snippet_tags_snippet_id_fkey"
            columns: ["snippet_id"]
            referencedRelation: "snippets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "snippet_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      snippet_shares: {
        Row: {
          id: string
          snippet_id: string
          shared_with_user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          snippet_id: string
          shared_with_user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          snippet_id?: string
          shared_with_user_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "snippet_shares_snippet_id_fkey"
            columns: ["snippet_id"]
            referencedRelation: "snippets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "snippet_shares_shared_with_user_id_fkey"
            columns: ["shared_with_user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
