import { useRouteError, isRouteErrorResponse } from "react-router";

export const ErrorElement = () => {
  const error = useRouteError();

  // Attempt to get line info from stack trace (for dev only)
  let fileLineInfo: string | null = null;
  if (error instanceof Error && error.stack) {
    const match = error.stack.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/);
    if (match) {
      const [, , file, line, column] = match;
      fileLineInfo = `${file}:${line}:${column}`;
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gray-100 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>

      <p className="text-gray-700 mb-4 max-w-md">
        Sorry, we couldn't load the page. This might be due to a technical issue.
      </p>

      {isRouteErrorResponse(error) ? (
        <>
          <p className="text-red-600 mb-2 font-medium">
            Error {error.status}: {error.statusText}
          </p>
          <p className="text-gray-600">{error.data || "No extra details available."}</p>
        </>
      ) : error instanceof Error ? (
        <>
          <p className="text-red-600 mb-2 font-medium">{error.message}</p>
          {fileLineInfo && (
            <p className="text-sm text-gray-500 mt-2">
              📄 Error location (dev): <code>{fileLineInfo}</code>
            </p>
          )}
        </>
      ) : (
        <p className="text-red-600 mb-2 font-medium">An unknown error occurred.</p>
      )}

      <p className="mt-6 text-sm text-gray-500">
        If this keeps happening, please contact the developer or support team.
      </p>
    </div>
  );
};
