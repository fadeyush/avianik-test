import axios from "axios";
import { AppDispatch } from "../index";
import { usersSlice } from "../reducers/UsersSlice";
import { UserProps } from "../../types/users";

export const fetchUsers = () => {
    return async(dispatch: AppDispatch) => {
        try {
            dispatch(usersSlice.actions.usersFetching());

            const response = await axios.get<UserProps[]>(`https://jsonplaceholder.typicode.com/users`)

            dispatch(usersSlice.actions.usersFetchingSuccess(response.data))
        } catch (e) {
            console.log(e)
            dispatch(usersSlice.actions.usersFetchingError('Произошла ошибка при загрузке пользователей!'))
        }
    }
}