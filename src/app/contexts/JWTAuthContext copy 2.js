import {
  createContext,
  useEffect,
  useReducer
} from 'react';
import axios from 'axios';
import {
  MatxLoading
} from 'app/components';

const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false
};

// const isValidToken = (accessToken) => {
//   if (!accessToken) return false;

//   const decodedToken = jwtDecode(accessToken);
//   const currentTime = Date.now() / 1000;
//   return decodedToken.exp > currentTime;
// };

// const setSession = (accessToken) => {
//   if (accessToken) {
//     localStorage.setItem('accessToken', accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem('accessToken');
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const {
        isAuthenticated,
        user
      } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      };
    }

    case 'LOGIN': {
      const {
        user
      } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    }

    case 'REGISTER': {
      const {
        user
      } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user
      };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => {},
  logout: () => {},
  register: () => {}
});

export const AuthProvider = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      // console.log(response)
      // if (response) {
      //   console.log("Login Successfully")
      //   alert(" Login Successful ");
      //   localStorage.setItem("token", response.data.authtoken)
      // } else if (!response.ok) {
      //   // Handle error response
      //   const errorData = await response.json();
      //   throw new Error(errorData.message);
      // }


      if (!response.ok) {
        // Handle error response
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const {
        user
      } = await response.json();
      // Handle successful login response
      // ...
    } catch (error) {
      // Handle any errors that occurred during the request
      // ...
    }
  };

  const register = async (email, username, password) => {
    const response = await axios.post('/api/auth/register', {
      email,
      username,
      password
    });
    const {
      user
    } = response.data;

    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = () => {
    dispatch({
      type: 'LOGOUT'
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const {
          data
        } = await axios.get('/api/auth/profile');
        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: true,
            user: data.user
          }
        });
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialised) return <MatxLoading / > ;

  return ( <
    AuthContext.Provider value = {
      {
        ...state,
        method: 'JWT',
        login,
        logout,
        register
      }
    } > {
      children
    } <
    /AuthContext.Provider>
  );
};

export default AuthContext;