type ErrorMessageProps = {
    message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
            <strong>Error:</strong> {message}
        </div>
    );
}