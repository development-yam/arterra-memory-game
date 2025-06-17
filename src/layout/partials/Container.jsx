const Container = ({ children, className = '', ...props }) => {
  return (
    <div className="w-full m-auto flex justify-center items-center grow" {...props}>
      <div className={`flex flex-col grow ${className}`}>{children}</div>
    </div>
  )
}

export default Container
