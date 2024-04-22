export interface UserProps {
    id: number;
    name: string;
    username: string;
    email: string;
}

export interface UsersListProps {
    isLoading: boolean;
    error: string;
    users: UserProps[];
}