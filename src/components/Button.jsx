const Button = ({ children, disabled = false, className = '', ...props }) => {
  return (
    <button
      className={`text-[60px] capitalize bg-brandBlue rounded-[300px] mx-auto flex items-center justify-center z-20 ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
