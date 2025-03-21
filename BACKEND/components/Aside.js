import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Aside() {
        const router = useRouter();
        const [clicked,setClicked]= useState(false);
   
  
        return <>

                <aside className="asideleft active">
                        <ul>

                                <Link href='/'>
                                <li className="navactive">
                                

                                <IoHome/>
                                <span> Dashboard</span>


                                </li>
                                </Link>
                                <li className="navactive flex-col flex-left">

                                        <div className="flex gap-1">
                                                <BsPostcard />
                                                <span> Blogs</span>

                                        </div>
                                </li>
                        </ul>

                </aside>



        </>


}
