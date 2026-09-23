import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { useGetEventsQuery } from "../graphql/generated";
import { getVideoThumbnail } from "../utils/video";
import { QueryFeedback } from "../components/QueryFeedback";

export function Home(){
    const { data, loading, error, refetch } = useGetEventsQuery({ notifyOnNetworkStatusChange: true })

    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full max-w-[1100px] mx-auto p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">
                    Events
                </h1>

                {loading ? (
                    <QueryFeedback message="Loading events..." />
                ) : error ? (
                    <QueryFeedback message="We couldn't load the events. Please try again." onRetry={() => refetch()} />
                ) : !data?.events.length ? (
                    <QueryFeedback message="No events are available yet." />
                ) : (
                    <div className="grid grid-cols-3 gap-8">
                        {data.events.map(event => {
                            const firstLesson = event.lessons[0];

                            return (
                                <Card
                                    key={event.id}
                                    to={`/event/${event.slug}`}
                                    title={event.name}
                                    description={event.description}
                                    imageUrl={firstLesson ? getVideoThumbnail(firstLesson.videoId) : undefined}
                                    lessonsCount={event.lessons.length}
                                />
                            )
                        })}
                    </div>
                )}
            </main>
        </div>
    )
}
