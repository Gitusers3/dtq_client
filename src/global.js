import Axios from 'axios';
const url = Axios.create({
    baseURL: 'http://localhost:4000/api/',
    UPLOAD_URI: 'http://localhost:4000/uploads',
    StaffUPLOAD_URI: 'http://localhost:4000/uploads/staffs'

});
export default url;