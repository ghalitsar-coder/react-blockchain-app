import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { checkIfTransactionsExist, checkIfWalletIsConnected, getEthereumContract } from './api/apiCalls';
import { Footer, Navbar, Services, Transactions, Welcome } from './components'
// const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const App = () => {
  useEffect(() => {
    checkIfTransactionsExist()
    checkIfWalletIsConnected()
  }, []);
  return (
    <div className="min-h-screen" >
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>

      <Services />
      <Transactions />
      <Footer />
      <ToastContainer />
      
    </div>
  )
}

export default App