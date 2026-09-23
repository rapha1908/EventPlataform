import { ArrowUpRight, VideoCamera } from "phosphor-react";
import { Link } from "react-router-dom";

interface CardProps {
    to: string;
    title: string;
    description?: string | null;
    imageUrl?: string;
    lessonsCount: number;
}

export function Card(props: CardProps){
    const lessonsLabel = `${String(props.lessonsCount).padStart(2, '0')} ${props.lessonsCount === 1 ? 'lesson' : 'lessons'}`;

    return(
        <Link
            to={props.to}
            className="group flex flex-col rounded-lg overflow-hidden border border-gray-200 bg-gray-100 hover:border-tccheblue-300 transition-colors"
        >
            <div className="aspect-video bg-gray-200 overflow-hidden">
                {props.imageUrl && (
                    <img
                        src={props.imageUrl}
                        alt={props.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                )}
            </div>

            <div className="flex-1 flex flex-col p-6">
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-gray-300">
                    <VideoCamera size={16} />
                    {lessonsLabel} / Online
                </span>

                <strong className="mt-4 text-2xl font-bold text-gray-900 leading-tight">
                    {props.title}
                </strong>

                {props.description && (
                    <p className="mt-3 text-gray-300 leading-relaxed">
                        {props.description}
                    </p>
                )}

                <footer className="mt-auto pt-6">
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                        <span className="font-bold text-gray-900">Explore event</span>
                        <ArrowUpRight size={18} className="text-gray-900 group-hover:text-tccheblue-300 transition-colors" />
                    </div>
                </footer>
            </div>
        </Link>
    )
}
