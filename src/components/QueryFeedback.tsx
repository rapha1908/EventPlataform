interface QueryFeedbackProps {
    message: string;
    onRetry?: () => Promise<unknown>;
}

export function QueryFeedback({ message, onRetry }: QueryFeedbackProps) {
    return (
        <div className="p-6 text-gray-600" role={onRetry ? "alert" : "status"}>
            <p>{message}</p>
            {onRetry && (
                <button
                    type="button"
                    className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                    onClick={() => { void onRetry().catch(() => undefined); }}
                >
                    Try again
                </button>
            )}
        </div>
    );
}
