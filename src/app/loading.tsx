export default function Loading() {
  return (
    <div className="min-h-screen bg-base-100 text-primary flex items-center justify-center px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary rounded-full opacity-5 blur-3xl animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
        {/* Animated Spinner */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[(--border-color)]"></div>

          {/* Animated gradient ring */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-secondary animate-spin"
            style={{
              animation: "spin 2s linear infinite",
            }}
          ></div>

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-linear-to-r from-primary to-secondary"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h2 className="text-lg sm:text-xl font-semibold">Loading</h2>
          <p className="text-sm sm:text-base text-secondary">
            Please wait while we prepare your content...
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2">
          <div
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-secondary animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-accent animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
