import { getStatistics } from '@/lib/data/content';
import { StatisticsClient } from './statistics-client';

export async function Statistics() {
  try {
    const statistics = await getStatistics();

    if (statistics.length === 0) {
      return null;
    }

    return <StatisticsClient statistics={statistics} />;
  } catch {
    // Return null if statistics can't be fetched (e.g., during build)
    return null;
  }
}
