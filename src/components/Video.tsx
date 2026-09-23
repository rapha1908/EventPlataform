import { DefaultUi, Player, Vimeo, Youtube } from "@vime/react";
import { QueryFeedback } from "./QueryFeedback";
import '@vime/core/themes/default.css';
import { useGetLessonBySlugQuery } from "../graphql/generated";
import { parseVideo } from "../utils/video";




interface VideoProps {
    lessonSlug: string;
}

export function Video(props: VideoProps){
    
    const { data, loading, error, refetch } = useGetLessonBySlugQuery({
        notifyOnNetworkStatusChange: true,
        variables: {
            slug: props.lessonSlug,
        }
    })

    if (loading || error || !data?.lesson){
        return (
            <div className="flex-1">
                {loading ? <QueryFeedback message="Loading lesson..." />
                : error ? <QueryFeedback message="We couldn't load this lesson. Please try again." onRetry={() => refetch()} />
                : <QueryFeedback message="Lesson not found. Choose another lesson from the schedule." />}
            </div>
        )
    }
        
        

    const video = parseVideo(data.lesson.videoId);

    return(
        <div className="flex-1">
            <div className="bg-black flex justify-center">
                <div className="w-full max-w-[min(1100px,106.67vh)]">
                    <Player>
                        {video.provider === 'youtube'
                            ? <Youtube videoId={video.id} />
                            : <Vimeo videoId={video.id} />}
                        <DefaultUi />
                    </Player>
                    </div>                

            </div>

            <div className="p-8 max-w-[1100px] mx-auto">
                <div className="flex items-start gap-16">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 ">
                            {data.lesson.title}
                        </h1>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            {data.lesson.description}
                        </p>

                      {data.lesson.teacher && (
                          <div className="flex items-center gap-4 mt-6">
                          <img
                           className="h-16 w-16 rounded-full border-2 border-blue-500"                             
                           src={data.lesson.teacher.avatarURL} alt="Teacher" />

                          <div className="leading-relaxed">
                              <strong className="font-bold text-2xl block text-gray-900">{data.lesson.teacher.name}</strong>
                              <span className="text-gray-900 text-sm block">{data.lesson.teacher.bio}</span>
                          </div>
                      </div>
                      )}

                    </div>
                </div>
            </div>
        </div>
    )
}
