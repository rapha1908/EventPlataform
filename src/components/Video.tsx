import { DefaultUi, Player, Vimeo } from "@vime/react";
import { CaretRight, DiscordLogo, FacebookLogo, FileArrowDown, InstagramLogo, Lightning } from "phosphor-react";
import '@vime/core/themes/default.css';
import { useGetLessonBySlugQuery } from "../graphql/generated";




interface VideoProps {
    lessonSlug: string;
}

export function Video(props: VideoProps){
    
    const { data } = useGetLessonBySlugQuery({
        variables: {
            slug: props.lessonSlug,
        }
    })

    if (!data || !data.lesson){
        return (
            <div className="flex-1">
                <p>Loading...</p>
            </div>
        )
    }
        
        

    return(
        <div className="flex-1">
            <div className="bg-black flex justify-center">
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
                    <Player>
                        <Vimeo videoId={data.lesson.videoId} />
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
                    <div className="flex flex-col gap-4">
                        <a href="#" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
                            <FacebookLogo size={24}/>
                            Facebook Community
                        </a>

                        <a href="#" className="p-4 text-sm border border-tccheblue-500 text-tccheblue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-tccheblue-500 transition-colors hover:text-gray-50">
                            <InstagramLogo size={24}/>
                            Instagram Community
                        </a>
                    </div>
                </div>

                <div className="gap-8 mt-20 grid grid-cols-2 "> 
                    <a href="#" className="bg-gray-100 rounded overflow-hidden flex items-start gap-6 hover:bg-gray-600 transition-colors">
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <FileArrowDown size={40} />

                        </div>
                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl text-gray-900">Material complementar</strong>
                            <p className="text-sm text-gray-900 mt-2">Acesse o material complementar para acelerar o seu desenvolvimento</p>
                            

                        </div>
                        <div className="h-full p-6 flex items-center">
                            <CaretRight />
                        </div>
                    </a>
                    <a href="#" className="bg-gray-100 rounded overflow-hidden flex items-start gap-6 hover:bg-gray-600 transition-colors">
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <FileArrowDown size={40} />

                        </div>
                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl text-gray-900">Wallpapers exclusivos</strong>
                            <p className="text-sm text-gray-900 mt-2">Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina</p>
                            

                        </div>
                        <div className="h-full p-6 flex items-center">
                            <CaretRight />
                        </div>
                    </a>
                
                </div>


            </div>

        </div>
    )
}