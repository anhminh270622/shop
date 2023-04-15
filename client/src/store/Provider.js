import Context from "./Context";
function Provider({ children }) {
    <Context.Provider>
        {children}
    </Context.Provider>
}
export default Provider;