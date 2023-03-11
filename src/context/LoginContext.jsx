import { useState, createContext } from 'react';

export const LoginContext = createContext()

const LoginContextProvider = ( props ) => {

    let [ user, setUser ] = useState( null ); // staten er tom medmindre der har været et succesfuldt login

    //** LOGIN METODE */
    let signin = ( newUser, password ) => {
        // Her arrangeres kald til API'ets login metoder, hvis det skal virke rigtigt
        // DETTE er bare simuleret
        if ( password === "1234" ) setUser( newUser === "eksamen2022" ); // Login OK
        // kan tilføjes i parantesen (password === "1234" && newUser === 'cecilia') KAN udvides som man vil fx. med email eller user.
        else setUser( null ) // LOGIN AFVIST - hvis ikke password matcher, nulstilles det
    };

    // callback
    //** LOGUD */
    let signout = () => {

        setUser( null ); // sætter user til null

    };

    return (
        <LoginContext.Provider value={ { user, signin, signout } }>
            { props.children }
        </LoginContext.Provider>
    )
};
export default LoginContextProvider;