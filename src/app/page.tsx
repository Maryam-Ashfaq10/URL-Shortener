import UrlForm from '@/components/UrlForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#0F2550] to-[#0B1B3A] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8 md:p-12">
          
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white tracking-tight">
              Shortly
            </h1>

            <p className="mt-4 text-white/70">
              Shorten URLs instantly with a fast and secure link shortener.
            </p>
          </div>

          <div className="mt-10">
            <UrlForm />
          </div>

        </div>
      </div>
    </main>
  );
}