import EntryForm from '@/components/EntryForm';
import Feed from '@/components/Feed';

export default function Home() {
  return (
    <main className="max-w-xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-4xl mb-3">🏡</div>
        <h1 className="text-3xl font-bold text-amber-900 tracking-tight">House Guestbook</h1>
        <p className="text-amber-700 mt-2 text-sm">Leave a memory from your visit</p>
      </div>

      {/* Form */}
      <EntryForm />

      {/* Feed */}
      <Feed />
    </main>
  );
}
