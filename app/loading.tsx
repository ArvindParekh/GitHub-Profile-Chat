export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="loading loading-spinner loading-lg"></div>
                <p className="text-lg">Loading...</p>
            </div>
        </div>
    );
}
