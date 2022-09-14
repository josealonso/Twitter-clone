import { Provider } from "next-auth/providers";
import Image from "next/image";

interface Props {
    providers: Provider[];
}

export const Login = (props: Props) => {
    return (
        <>
            <div className="">
                <div>
                    <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all
        bg-white rounded hover:bg-white group">
                        <span className="abanico-transition-span-one"></span>
                        <span className="abanico-transition-span-two">
                            Sign in with AAAA
                        </span>
                    </button>
                </div>

                <Image
                    src="https://rb.gy/ogau5a"
                    width={150}
                    height={150}
                    objectFit="contain"
                />
                <div>
                    {/* {Object.values([props.providers]).map(provider => { */}
                    {Object.values(["Google", "github"]).map(provider => {
                        <div>
                            <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                                <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                                    Sign in with
                                </span>
                            </button>
                        </div>
                    })}
                </div>
            </div>
        </>
    );
}

{/* https://devdojo.com/tailwindcss/buttons# */ }
