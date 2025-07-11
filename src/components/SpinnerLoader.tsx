export function SpinnerLoader() {
    return (
        <div className="flex items-center justify-center w-full min-h-96">
            <div
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                role="status"
                aria-label="Loading"
            />
            <span className="sr-only">Loading...</span>
        </div>
    );
}
