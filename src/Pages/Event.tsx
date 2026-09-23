import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { QueryFeedback } from "../components/QueryFeedback";
import { Video } from "../components/Video";


export function Event(){
    const { eventSlug, slug } = useParams<{eventSlug: string, slug: string}>()

    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-1">
                { slug  
                ? <Video lessonSlug={slug} /> 
                : <div className="flex-1"><QueryFeedback message="Choose a lesson from the schedule to start watching." /></div>
                }
                <Sidebar eventSlug={eventSlug!} />
            </main>
        </div>
    )
}
