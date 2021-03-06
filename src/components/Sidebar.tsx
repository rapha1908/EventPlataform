import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";


export function Sidebar(){
    const {data} = useGetLessonsQuery()
    console.log(data)
    return(
        <aside className="w-[348px] bg-white p-6 border-l border-gray-100">
            <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-200 block text-gray-900 text-center">
                 Schedule
            </span>

            <div className="flex flex-col gap-8">
              {data?.lessons.map(lesson => {
                return(
                    <Lesson 
                    key={lesson.id}
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