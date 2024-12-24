import { Button } from './button';
import {  Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';
type Prop = {
  onSearsh?(e?: React.ChangeEvent): void;
    t2: string;
    t3:string;
    buttonTitle?:string
    Click?:any
  }
export default function Heading({onSearsh,t2,t3,buttonTitle='ADD ONE ',Click}:Prop) {
  return (

    <div >
        {/* Start Heading*/}

    <div className=' flex mx-4 sm:text-2xl max-sm:text-xl font-medium my-2'>
      <h2 className='font-medium text-gray-600'>{t2}  /</h2><h3> {t3}</h3>
    </div>

    <div className=' flex justify-between items-end item-bottom '>
{/* Start search form*/} 

<motion.div>
<div className=' flex items-center border rounded-2xl my-2'>
<Search className='ml-2 text-neutral-500 dark:text-neutral-200 dark:peer-focus:text-primary'  />

<div className="relative items-center flex  border-b-0    sm:text-2xl" data-te-input-wrapper-init>
  <input
  onChange={onSearsh}
    type="text"
    className="  text-sm p-2 text-neutral-500   duration-200 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3  leading-[1.6] outline-none   ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  sdark:peer-focus:text-primary"
    id="exampleSearch2"
    placeholder={`Search On ${t3}`}
    
    />
  
</div>

</div>
</motion.div>

{/* Start button*/}
<Button onClick={Click}  className=' sm:text-base max-sm:text-xs p-5 py-4 my-4'><Plus size={28}  /> {buttonTitle}</Button>

</div>
    </div>
  )
}
