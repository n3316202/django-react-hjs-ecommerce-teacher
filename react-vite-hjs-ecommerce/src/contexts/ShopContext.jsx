import { createContext, useContext } from "react"

const ShopContext = createContext()

export const useShop = () => useContext(ShopContext)

export const ShopProvider = ({children}) => {

  return <ShopContext.Provider value={'없음'}>{children}</ShopContext.Provider>
}