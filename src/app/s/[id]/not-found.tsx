export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-2">Snippet Not Found</h2>
        <p className="text-neutral-600">
          The snippet you're looking for doesn't exist or has been deleted.
        </p>
      </div>
    </div>
  )
}
