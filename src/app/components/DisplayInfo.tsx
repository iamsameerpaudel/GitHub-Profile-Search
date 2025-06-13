import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import ProfileLoading from "./ProfileLoading"
type userData =
  {
    name: string,
    email: string,
    avatar_url: string,
    bio: string,
    location: string,
    html_url: string,
    blog: string,
    followers: number,
    following: number,
    public_repos: number,
    created_at: string
  }
const emptyData: userData = {
  name: "",
  email: "",
  avatar_url: "",
  bio: "",
  location: "",
  html_url: "",
  blog: "",
  followers: 0,
  following: 0,
  public_repos: 0,
  created_at: ""
}
const DisplayInfo = () => {
  const [userName, setUserName] = useState<string>("")
  const [data, setData] = useState<userData | null>(null)
  const [date, setDate] = useState<string>("")
  const handleSearch = async () => {
    try {
      const result = await axios.get(`https://api.github.com/users/${userName}`)
      const finalData = result.data
      setData(finalData)
      console.log(finalData)
      const isoString = finalData.created_at || "";
      if (isoString === "") {
        setDate("N/A")
      } else {
        const date = new Date(isoString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const formatted = `${year}/${month}/${day}`;
        setDate(formatted)
      }
    } catch (err) {
      setData(emptyData)
      alert("User Not Found")
      console.log("ERROR:", err)
    }

  }

  return (
    <div className=" w-full rounded-xl md:w-[80%] xl:w-1/2 max-h-fit h-auto  md:h-3/4 flex flex-col">
      <div className="border-b-2 gap-3 border-white min-h-[8em] flex justify-center items-center" >
        <input value={userName} onKeyDown={(e) => e.key === "Enter" && handleSearch()} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Search a GitHub UserName " className="w-[70%] h-1/3 text-[1em] rounded-md text-white px-5 bg-gray-600 " />
        <button onClick={handleSearch} className="w-[10%] h-1/3 items-center text-white flex justify-center rounded-md border-2 bg-gray-600 border-gray-50" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" width={24} strokeWidth={1.5} viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
        </button>
      </div>
      <div className="flex h-auto  flex-1 sm:flex-row flex-col">
        <div className="sm:w-1/2 h-full flex justify-center  flex-col p-3 items-center " >
          {data?.avatar_url ? (<Image src={data.avatar_url} alt="avatar" className="rounded-xl" width={300} height={300} />) : <ProfileLoading />}
        </div>
        <div className="sm:w-1/2 h-full flex flex-col justify-center items-left  py-3 sm:pt-7 pl-5 ">
          <h3 className="text-white text-2xl">{data?.name ? data.name : "N/A"}</h3>
          <h4 className="text-gray-400">{data?.bio}</h4>
          <h4 className="text-gray-400 flex"><svg xmlns="http://www.w3.org/2000/svg" width={17} className="mr-2" fill='#9595a0' strokeWidth={1.5} viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>  {data?.email ? data.email : "N/A"}</h4>
          <h4 className="text-gray-400 flex"><svg xmlns="http://www.w3.org/2000/svg" width={15} className="mr-2" fill='#9595a0' strokeWidth={1.5} viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg> {data?.location || "N/A"}</h4>
          {data?.html_url && (<Link href={data.html_url} className="text-gray-400 flex underline" > <svg className="mr-2" width={15} fill='#9595a0' strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg> GitHub</Link>)}
          {data?.blog && (<Link href={data.blog} className="text-gray-400 underline flex"><svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width={15} fill='#9595a0' strokeWidth={1.5} viewBox="0 0 512 512"><path d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z" /></svg> WebSite</Link>)}
          <h4 className="text-gray-400">Public Repos: {data?.public_repos || 'N/A'}</h4>
          <div className="flex gap-5" >
            <h4 className="text-gray-400">Followers: {data?.followers || 'N/A'}</h4>
            <h4 className="text-gray-400">Following: {data?.following || 'N/A'}</h4>
            <h4 className="text-gray-400 text-sm">Created: {date || 'N/A'}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayInfo
