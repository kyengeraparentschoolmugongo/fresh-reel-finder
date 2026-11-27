export function MovieHomePending() {
  return <div role="status" aria-label="Loading entertainment" aria-busy="true" className="px-5 pb-12 pt-28 sm:px-10">
    <div aria-hidden="true" className="animate-pulse motion-reduce:animate-none">
      <div className="flex min-h-80 flex-col justify-end gap-5 bg-muted/40 p-6 sm:min-h-96">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-12 w-3/4 max-w-lg rounded bg-muted" />
        <div className="h-4 w-2/3 max-w-md rounded bg-muted" />
        <div className="h-10 w-28 rounded bg-muted" />
      </div>
      <div className="mb-5 mt-10 h-6 w-44 rounded bg-muted" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 6 }, (_, index) => <div key={index} className="aspect-[2/3] rounded bg-muted" />)}
      </div>
    </div>
  </div>;
}