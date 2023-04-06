import { EXPORT_DATA, GET_DATA, IMPORT_DATA } from "./actionsType";

let initialData = [{
    data: []
}]

const dataReducer = (state = initialData, { type, payload }) => {
    switch (type) {
        case GET_DATA: {
            return { ...state, data: payload }
        }
        case IMPORT_DATA: {
            return { ...state, payload };
        }
        case EXPORT_DATA: {
            return state;
        }
        default: {
            return state;
        }
    }
};
export default dataReducer;
