import { createServerClient } from '@/lib/supabase';
import { CategoryForm } from '../components/category-form';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CategoryEditPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === 'new';
  const supabase = createServerClient();

  let category = null;
  if (!isNew) {
    const { data } = await supabase
      .from('rax_landing_product_categories')
      .select('*')
      .eq('id', id)
      .single();

    if (!data) notFound();
    category = data;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">
        {isNew ? 'Add Category' : 'Edit Category'}
      </h1>
      <CategoryForm category={category} />
    </div>
  );
}
