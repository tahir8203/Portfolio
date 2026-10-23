export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold">This page wandered off.</h1>
        <a href="/" className="mt-6 inline-block rounded-full bg-cyan px-5 py-2.5 font-semibold text-ink">
          Back to the portfolio
        </a>
      </div>
    </main>
  );
}
