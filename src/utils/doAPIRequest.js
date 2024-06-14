import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const doAPIRequest = async (url, method = 'get', payload = null) => {
    try {
        const baseURL = import.meta.env.VITE_BACKEND_URL;

        const response = await axios.request({
          baseURL: `${baseURL}${url}`,
          method,
          data: payload,
          headers: {
            'x-user-id': 'front' //nanoid(4)
          }
        });
    
        return response.data;
      } catch (error) {
        console.error(error);
        let errorText = error;
        if (error.response.status === 422) {
          // validation error from backend
          errorText = error.response.data.validationError.message;
        }
        await MySwal.fire({
          title: "API Request error",
          text: errorText,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
};

export default doAPIRequest;