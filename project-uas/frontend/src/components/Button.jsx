const Button = ({ style, text, handleClick, type }) => {
  return (
    <button
      onClick={handleClick}
      className={`${style} py-1.5 px-5 text-white font-medium rounded-md transition-all`}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
