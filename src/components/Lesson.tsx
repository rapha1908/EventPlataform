import { CheckCircle, Lock } from "phosphor-react"
import { format, isPast } from "date-fns"
import { Link, useParams } from "react-router-dom";

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class';
}



export function Lesson(props: LessonProps){
    const {slug} = useParams< { slug:string } >()

    const isLessonAvailable = isPast(props.availableAt);
    const availableformatted = format(props.availableAt,"PPPP")

    const meuLink = myLink()

    function myLink(){
        if (isLessonAvailable){
            return `/event/lesson/${props.slug}`
        } else{
            return `#`
        }
    }

    const isActiveLesson = slug === props.slug;
      


    return(
        <Link to={meuLink} className="group">
            <span className="text-gray-300">
                 {availableformatted}
            </span>
            
            <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-tccheblue-300 ${isActiveLesson ? 'bg-tccheblue-400' : 'bg-gray-50 ' } ${!isLessonAvailable ? 'opacity-50' : '' }`} >
                <header className="flex items-center justify-between">
                    {isLessonAvailable ? 
                        (
                            <span className={`text-sm text-tccheblue-300 font-medium flex items-center gap-2 ${isActiveLesson ? 'text-white' : '' }`}>
                                <CheckCircle size={20} />
                                   Conteudo Liberado
                            </span>
                        ):
                        (
                            <span className={`text-sm text-orange-600 font-medium flex items-center gap-2`}>
                                <Lock size={20} />
                                Em breve
                            </span>
                        )
                    }
          
                    <span className="text-xs rounded px-2 py-[2px] text-gray-600 border border-tccheblue-300 font-bold">
                        {props.type === 'live' ? 'LIVE' : 'CLASS'} 
                    </span>

                </header>

                <strong className={`text-gray-500 mt-5 block ${isActiveLesson ? 'text-gray-100' : '' }`}>
                    {props.title} 
                </strong>
            </div>
        </Link>
    )
}