export function BarRating({ score }: { score: number }) {
    return (
        <div className="h-2 w-24 bg-gray-200 rounded">
            <div
                className="h-full bg-blue-500 rounded"
                style={{ width: `${(score / 5) * 100}%` }}
            />
        </div>
    );
}