import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";


export function Subscribe() {
    const navegate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [ createSubscriber, {loading} ] = useCreateSubscriberMutation()
    

    async function HandleSubscribe(event: FormEvent) {
        event?.preventDefault();

        await createSubscriber({
            variables: {
                name, 
                email
            }
        })

        navegate('/event/')

    }

    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">

            <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
                <div className="max-w-[640px]">
                    <Logo />
                    <h1 className="mt-8 text-[2.5rem] leading-tight">
                        Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
                        </h1>
                    <p className="mt-4 text-gray-200 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>
                
                </div>
                <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                        <strong className="text-2xl mb-6 block"> inscreva-se GRATUITAMENTE</strong>
                        <form onSubmit={HandleSubscribe} className="flex flex-col gap-2 w-full">
                            <input 
                                type="text" 
                                placeholder="Write your name" 
                                className="bg-gray-900 rounded h-14 p-4" 
                                onChange={event => setName(event.target.value)} 
                            />
                             <input 
                                type="Email" 
                                placeholder="Write your Email" 
                                className="bg-gray-900 rounded h-14 p-4"
                                onChange={event => setEmail(event.target.value)}  
                            />

                            <button 
                                type="submit"
                                disabled={loading}
                                className="my-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50">
                                Garantir minha vaga
                            </button>

                        </form>
                    </div>
          
            </div>
            <div className=" min-h-[500px] bg-screen w-[1000px] bg-cover bg-no-repeat mx-auto">

            </div>
        </div>
    );
}