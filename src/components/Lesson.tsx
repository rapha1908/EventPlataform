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
            
            <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActiveLesson ? 'bg-green-500' : '' } ${!isLessonAvailable ? 'opacity-50' : '' }`} >
                <header className="flex items-center justify-between">
                    {isLessonAvailable ? 
                        (
                            <span className={`text-sm text-blue-500 font-medium flex items-center gap-2 ${isActiveLesson ? 'text-gray-100' : '' }`}>
                                <CheckCircle size={20} />
                                   Conteudo Liberado
                            </span>
                        ):
                        (
                            <span className={`text-sm text-orange-500 font-medium flex items-center gap-2`}>
                                <Lock size={20} />
                                Em breve
                            </span>
                        )
                    }
          
                    <span className="text-xs rounded px-2 py-[2px] text-white border border-green-300 font-bold">
                        {props.type === 'live' ? 'Ao VIVO' : 'aula pratica'} 
                    </span>

                </header>

                <strong className={`text-gray-200 mt-5 block ${isActiveLesson ? 'text-gray-100' : '' }`}>
                    {props.title} 
                </strong>
            </div>
        </Link>
    )
}