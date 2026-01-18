import { createServerClient } from '@/lib/supabase';
import { NumbersEditor } from './components/numbers-editor';

export default async function AdminNumbersPage() {
  const supabase = createServerClient();

  const { data: statistics } = await supabase
    .from('rax_landing_statistics')
    .select('*')
    .order('sort_order');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Numbers</h1>
        <p className="text-muted-foreground">
          Manage the key statistics displayed on the homepage
        </p>
      </div>

      <NumbersEditor initialStats={statistics || []} />
    </div>
  );
}
