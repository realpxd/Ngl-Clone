import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col container mx-auto p-4 text-center align-center justify-center h-screen">
      {/* <img src="/path-to-your-image/404.png" alt="Page Not Found" className="mx-auto mb-4" /> */}
      <h1 className="text-4xl font-bold mb-2">Oops!</h1>
      <h2 className="text-2xl font-semibold mb-4">
        We can't seem to find the page you're looking for.
      </h2>
      <p className="mb-4">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go to Homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
