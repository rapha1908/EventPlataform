import { ArrowLeft } from "phosphor-react";
import { Link } from "react-router-dom";
import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";
import { QueryFeedback } from "./QueryFeedback";

interface SidebarProps {
    eventSlug: string;
}

export function Sidebar(props: SidebarProps){
    const {data, loading, error, refetch} = useGetLessonsQuery({
        notifyOnNetworkStatusChange: true,
        variables: {
            eventSlug: props.eventSlug,
        }
    })

    return(
        <aside className="w-[348px] bg-white p-6 border-l border-gray-100">
            <Link to="/" className="text-sm text-gray-300 flex items-center gap-2 hover:text-tccheblue-300 transition-colors">
                <ArrowLeft size={16} />
                All events
            </Link>

            <span className="font-bold text-2xl pb-6 mt-4 mb-6 border-b border-gray-200 block text-gray-900 text-center">
                 {data?.event?.name ?? 'Schedule'}
            </span>

            <div className="flex flex-col gap-8">
              {loading ? (
                <QueryFeedback message="Loading schedule..." />
              ) : error ? (
                <QueryFeedback message="We couldn't load the schedule. Please try again." onRetry={() => refetch()} />
              ) : !data?.event ? (
                <QueryFeedback message="Event not found." />
              ) : !data.event.lessons.length ? (
                <QueryFeedback message="No lessons are available for this event yet." />
              ) : data.event.lessons.map(lesson => {
                return(
                    <Lesson 
                    key={lesson.id}
                    eventSlug={props.eventSlug}
                    title={lesson.title}
                    slug={lesson.slug}
                    availableAt={new Date(lesson.availableAt)}
                    type= {lesson.lessonType}
                />
                
                )
              })}
             

            </div>

        </aside>
    )
}
