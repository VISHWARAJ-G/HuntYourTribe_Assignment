function Pagination({ page, setPage, hasMore, allRead }) {
  
  return (
    <div className="mt-4 mx-64 mb-2 flex justify-between items-center gap-5">
      <button onClick={() => allRead()} className="bg-slate-200 p-4 rounded-xl">
        Mark all as read
      </button>
      <div>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-gray-200 rounded"
          disabled={page === 1}
        >
          {"<"}
        </button>
        <span className="mx-5">Page {page}</span>
        <button
          onClick={() => hasMore && setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
          disabled={!hasMore}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Pagination;
