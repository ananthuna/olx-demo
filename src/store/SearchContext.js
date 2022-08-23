import { createContext,useState } from "react";

export const SearchContext = createContext(null)


function Search({children}){

    
    const [SearchDetails,setSearchDetails] = useState()
    return(
        <SearchContext.Provider value={{SearchDetails,setSearchDetails}}>
            {children}
        </SearchContext.Provider>
    )
}

export default Search