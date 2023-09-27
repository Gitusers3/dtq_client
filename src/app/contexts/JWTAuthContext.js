import {
  createContext,
  useEffect,
  useReducer
} from 'react';
import axios from 'axios';
import {
  MatxLoading
} from 'app/components';
import jwtDecode from 'jwt-decode';
const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false
};

const isValidToken = (accessToken) => {
  // alert(accessToken)
  if (!accessToken) return false;
  const decodedToken = jwtDecode(accessToken);
  // console.log(decodedToken)
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

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
      console.log(user)
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
  console.log(state)
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:4000/api/admin/login', {
        email,
        password
      });
      console.log(response.data)
      const {
        user,
        authToken,
      } = response.data;
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          authToken,
        }
      });
      // isValidToken(authToken)
      setSession(authToken)

    } catch (error) {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data); // Error response data from the server
        console.log(error.response.status); // Error status code
        console.log(error.response.headers); // Error response headers
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request); // Error request information
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message); // Error message
      }
      console.log(error.config); // Config that was used to make the request
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
    localStorage.removeItem('accessToken');
    localStorage.clear();
    delete axios.defaults.headers.common.Authorization;
  };
  // console.log(localStorage.getItem('accessToken'))
  useEffect(() => {
    (async () => {
      try {
        // console.log(state.user._id)
        const {
          data
        } = await axios.get(`http://localhost:4000/api/admin/view`, {
          headers: {
            'authToken': localStorage.getItem('accessToken')
          }
        });
        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: true,
            user: data
          }
        });
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: true,
            user: null
          }
        });
      }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialised) return <MatxLoading / > ;

  return ( 
    <AuthContext.Provider value = {
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