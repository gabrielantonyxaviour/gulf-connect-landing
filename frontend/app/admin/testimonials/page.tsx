import { createServerClient } from '@/lib/supabase';
import { TestimonialsGrid } from './components/testimonials-grid';

export default async function AdminTestimonialsPage() {
  const supabase = createServerClient();

  const { data: testimonials } = await supabase
    .from('rax_landing_testimonials')
    .select('*')
    .order('sort_order');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground">
            Manage client testimonials displayed on the website
          </p>
        </div>
      </div>

      <TestimonialsGrid testimonials={testimonials || []} />
    </div>
  );
}
