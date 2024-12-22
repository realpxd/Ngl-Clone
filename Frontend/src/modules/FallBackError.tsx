const FallBackError = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* <img src="/path/to/error-image.png" alt="Error" className="w-1/2 mb-4" /> */}
      <h1 className="text-4xl font-bold text-red-600 mb-2">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        We are working to fix the issue. Please try again later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Reload Page
      </button>
    </div>
  );
};

export default FallBackError;
