type inputBoxType = {
  placeholder: string;
  type?: string;
  onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
};
export const InputBox = ({ placeholder, type, onChange }: inputBoxType) => {
  return (
    <div className="my-2">
      <input
        type={type || "text"}
        placeholder={placeholder}
        className="w-full rounded outline outline-1 outline-gray-800 bg-stone-50 font-mono focus:bg-stone-100"
        onChange={onChange}
      />
    </div>
  );
};
