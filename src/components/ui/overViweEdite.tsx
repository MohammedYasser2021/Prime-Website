
export default function OverViweEdite( {children,setViw}: {children: any,setViw:any}): JSX.Element {




  return (<div  className="  top-0 left-0   fixed w-full h-full z-10  ">
    <div style={{minWidth:''}}  className=" max-sm: w-3/4   sm:w-1/3 absolute right-1/2 bottom-1/2 translate-y-1/2 translate-x-1/2 shadow-lg rounded-md flex dark:bg-zinc-800  p-2 bg-slate-100 z-20 ">
      {children}
    </div>
    <div onClick={

      setViw
    }  className=" w-full h-full bg-black opacity-70"></div>
    </div>
  )
}
