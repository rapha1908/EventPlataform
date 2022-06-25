import { Logo } from "./Logo";

export function Header(){
    return(
       <div>
        <header className="w-full py-5 flex items-center justify-center bg-tccheblue-500 border-b border-white">
            <Logo />
        </header>
            
       </div>
    )
}