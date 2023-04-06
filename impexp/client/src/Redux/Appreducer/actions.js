import { EXPORT_DATA, GET_DATA, IMPORT_DATA } from "./actionsType";
import axios from "axios"

//counter app

export const getdata = () => (dispatch) => {
    const url = 'http://localhost:8000/';
    axios
        .get(url)
        .then((res) => {
            // console.log(res);
            dispatch({ type: GET_DATA, payload: res.data });
        })
        .catch(() => {
            alert("Error")
        });
}




export const importData = (file) => (dispatch) => {
    console.log(file);
    dispatch({ type: IMPORT_DATA });
    const url = 'http://localhost:8000/upload';
    const formData = new FormData();
    formData.append('file', file);
    axios.post(url, formData, {
        headers: {
            'content-type': 'multipart/form-data',
        },
    }).then((response) => {
        alert("Successfully Inserted")

    });
};

export const exportData = () => ({ type: EXPORT_DATA });

