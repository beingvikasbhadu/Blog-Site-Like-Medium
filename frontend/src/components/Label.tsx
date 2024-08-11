export const Label = ({ text }: { text: string }) => {
  return (
    <div>
      <label className="text-slate-600 font-mono font-medium">{text}</label>
    </div>
  );
};
