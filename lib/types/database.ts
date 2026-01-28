export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      rax_landing_products: {
        Row: {
          id: string;
          category_id: string;
          model: string;
          name: string;
          short_description: string | null;
          long_description: string | null;
          catalog_url: string | null;
          image: string;
          is_customer_usecase: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          model: string;
          name: string;
          short_description?: string | null;
          long_description?: string | null;
          catalog_url?: string | null;
          image: string;
          is_customer_usecase?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          model?: string;
          name?: string;
          short_description?: string | null;
          long_description?: string | null;
          catalog_url?: string | null;
          image?: string;
          is_customer_usecase?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      rax_landing_product_categories: {
        Row: {
          id: string;
          title: string;
          short_title: string;
          route: string;
          headline: string;
          description: string;
          icon: string;
          image: string;
          offerings: string[];
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          short_title: string;
          route: string;
          headline: string;
          description: string;
          icon: string;
          image: string;
          offerings: string[];
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          short_title?: string;
          route?: string;
          headline?: string;
          description?: string;
          icon?: string;
          image?: string;
          offerings?: string[];
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      rax_landing_jobs: {
        Row: {
          id: string;
          slug: string;
          title: string;
          department: string;
          location: string;
          job_type: string;
          experience_level: string;
          description: string;
          requirements: string[];
          responsibilities: string[];
          benefits: string[];
          salary_range: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          department: string;
          location: string;
          job_type: string;
          experience_level: string;
          description: string;
          requirements: string[];
          responsibilities: string[];
          benefits?: string[];
          salary_range?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          department?: string;
          location?: string;
          job_type?: string;
          experience_level?: string;
          description?: string;
          requirements?: string[];
          responsibilities?: string[];
          benefits?: string[];
          salary_range?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      rax_landing_job_applications: {
        Row: {
          id: string;
          job_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          current_company: string | null;
          linkedin_url: string | null;
          portfolio_url: string | null;
          resume_url: string | null;
          years_experience: string | null;
          cover_letter: string | null;
          status: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          current_company?: string | null;
          linkedin_url?: string | null;
          portfolio_url?: string | null;
          resume_url?: string | null;
          years_experience?: string | null;
          cover_letter?: string | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          current_company?: string | null;
          linkedin_url?: string | null;
          portfolio_url?: string | null;
          resume_url?: string | null;
          years_experience?: string | null;
          cover_letter?: string | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      rax_landing_contact_messages: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          company: string | null;
          message: string;
          is_read: boolean;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          message: string;
          is_read?: boolean;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          message?: string;
          is_read?: boolean;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      rax_landing_statistics: {
        Row: {
          id: string;
          value: number;
          suffix: string;
          label: string;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          value: number;
          suffix: string;
          label: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          value?: number;
          suffix?: string;
          label?: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      rax_landing_testimonials: {
        Row: {
          id: string;
          name: string;
          role: string;
          company: string;
          company_logo: string | null;
          content: string;
          avatar: string | null;
          rating: number;
          is_featured: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          company: string;
          company_logo?: string | null;
          content: string;
          avatar?: string | null;
          rating?: number;
          is_featured?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          company?: string;
          company_logo?: string | null;
          content?: string;
          avatar?: string | null;
          rating?: number;
          is_featured?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      rax_landing_admin_users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: string;
          is_active: boolean;
          created_at: string;
          last_login: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          role?: string;
          is_active?: boolean;
          created_at?: string;
          last_login?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: string;
          is_active?: boolean;
          created_at?: string;
          last_login?: string | null;
        };
        Relationships: [];
      };
      rax_landing_admin_whitelist: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          role: string;
          created_at: string;
          invited_by: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          role?: string;
          created_at?: string;
          invited_by?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          role?: string;
          created_at?: string;
          invited_by?: string | null;
        };
        Relationships: [];
      };
      rax_landing_gallery_events: {
        Row: {
          id: string;
          company: 'rax-chennai' | 'rax-europe' | 'gulf-connect';
          title: string;
          description: string | null;
          event_date: string | null;
          slug: string;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company: 'rax-chennai' | 'rax-europe' | 'gulf-connect';
          title: string;
          description?: string | null;
          event_date?: string | null;
          slug: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company?: 'rax-chennai' | 'rax-europe' | 'gulf-connect';
          title?: string;
          description?: string | null;
          event_date?: string | null;
          slug?: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      rax_landing_gallery_images: {
        Row: {
          id: string;
          event_id: string;
          filename: string;
          original_filename: string | null;
          storage_path: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          filename: string;
          original_filename?: string | null;
          storage_path: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          filename?: string;
          original_filename?: string | null;
          storage_path?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Convenience types
export type Product = Database['public']['Tables']['rax_landing_products']['Row'];
export type ProductCategory = Database['public']['Tables']['rax_landing_product_categories']['Row'];
export type Job = Database['public']['Tables']['rax_landing_jobs']['Row'];
export type JobApplication = Database['public']['Tables']['rax_landing_job_applications']['Row'];
export type ContactMessage = Database['public']['Tables']['rax_landing_contact_messages']['Row'];
export type Statistic = Database['public']['Tables']['rax_landing_statistics']['Row'];
export type Testimonial = Database['public']['Tables']['rax_landing_testimonials']['Row'];
export type AdminUser = Database['public']['Tables']['rax_landing_admin_users']['Row'];
export type AdminWhitelist = Database['public']['Tables']['rax_landing_admin_whitelist']['Row'];

// Insert types
export type ProductInsert = Database['public']['Tables']['rax_landing_products']['Insert'];
export type ProductCategoryInsert = Database['public']['Tables']['rax_landing_product_categories']['Insert'];
export type JobInsert = Database['public']['Tables']['rax_landing_jobs']['Insert'];
export type JobApplicationInsert = Database['public']['Tables']['rax_landing_job_applications']['Insert'];
export type ContactMessageInsert = Database['public']['Tables']['rax_landing_contact_messages']['Insert'];
export type StatisticInsert = Database['public']['Tables']['rax_landing_statistics']['Insert'];
export type TestimonialInsert = Database['public']['Tables']['rax_landing_testimonials']['Insert'];
export type AdminUserInsert = Database['public']['Tables']['rax_landing_admin_users']['Insert'];

// Update types
export type ProductUpdate = Database['public']['Tables']['rax_landing_products']['Update'];
export type ProductCategoryUpdate = Database['public']['Tables']['rax_landing_product_categories']['Update'];
export type JobUpdate = Database['public']['Tables']['rax_landing_jobs']['Update'];
export type JobApplicationUpdate = Database['public']['Tables']['rax_landing_job_applications']['Update'];
export type ContactMessageUpdate = Database['public']['Tables']['rax_landing_contact_messages']['Update'];
export type StatisticUpdate = Database['public']['Tables']['rax_landing_statistics']['Update'];
export type TestimonialUpdate = Database['public']['Tables']['rax_landing_testimonials']['Update'];
export type AdminUserUpdate = Database['public']['Tables']['rax_landing_admin_users']['Update'];
