
interface PropTypes { 
    title : string , 
    setVal():void,
    value : 0 | 1
}

const Switch:React.FC<PropTypes> = ({value , setVal , title}) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input onChange={setVal} checked={value ? true : false}   type="checkbox" value={0} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent dark:peer-focus:ring-accent rounded-full peer  ltr:peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] rtl:after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
      <span className="ltr:ml-3 rtl:mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {title}
      </span>
    </label>
  );
};

export default Switch;
