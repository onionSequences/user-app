'use client';

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="empty-state wrapper">
      <h3>Something went wrong</h3>
      <p>We could not load your family data.</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
