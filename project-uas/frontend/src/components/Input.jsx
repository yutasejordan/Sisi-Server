const Input = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      className="bg-slate-200 rounded-md mb-4 shadow-md px-2 py-3 font-medium"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
