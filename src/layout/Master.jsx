import Header from './partials/Header'

const MasterLayout = ({ children }) => {
  return (
    <>
      <div id="master-layout" className="w-[100vw] h-[100vh] relative flex flex-col overflow-y-hidden">
        <Header />
        {children}
      </div>
    </>
  )
}

export default MasterLayout
