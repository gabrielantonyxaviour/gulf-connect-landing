import { createServerClient } from '@/lib/supabase';
import { TestimonialForm } from '../components/testimonial-form';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TestimonialEditPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === 'new';
  const supabase = createServerClient();

  let testimonial = null;
  if (!isNew) {
    const { data } = await supabase
      .from('rax_landing_testimonials')
      .select('*')
      .eq('id', id)
      .single();

    if (!data) notFound();
    testimonial = data;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">
        {isNew ? 'Add Testimonial' : 'Edit Testimonial'}
      </h1>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
