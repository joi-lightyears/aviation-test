import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { SearchResults } from '@/components/search/search-results';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#F5F8FF_0%,#DBF5FF_46%,#ffffff_46%,#ffffff_100%)]">
      <Header />
      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults />
        </Suspense>
      </main>
    </div>
  );
}
