export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
        <p className="text-neutral-600">
          The username you're looking for doesn't exist.
        </p>
      </div>
    </div>
  )
}
