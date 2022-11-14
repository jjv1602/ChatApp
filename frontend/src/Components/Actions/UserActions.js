import axios from 'axios';
export const login = (email, password) => async (dispatch) => {
    try {
    //   dispatch(loginActions.USER_LOGIN_REQUEST());  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
      // console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
    //   dispatch(loginActions.USER_LOGIN_SUCCESS(data));
  
      
    } catch (error) {
        
    }
  };
  