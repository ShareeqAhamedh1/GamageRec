import { useState } from "react";
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx";

const useEdit = () => {
    const { edit } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const editUser = async (values) => {
        try {
            setError(null);
            setLoading(true); // Set loading state to true when login process starts

            const res = await fetch('http://localhost:3000/api/auth/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (res.status === 200) {
                message.success(data.message);
                edit(data.token, data.user);
            } else if (res.status === 404) {
                setError(data.message);
            } else {
                throw new Error('Edit failed');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Reset loading state to false after login process completes
        }
    };


    return { loading, error, editUser };
};

export default useEdit;
