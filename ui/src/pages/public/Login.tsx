import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/interactive";
import { AuthContext, Role } from "../../context/AuthContext";

type Props = {}

export const Login: React.FC<Props> = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const logIn = () => {
        setUser({
            userId: 'user-id',
            firstName: 'Brian',
            lastName: 'Moore',
            email: 'brian@sunami.io',
            role: Role.ADMIN,
            createdAt: new Date().toUTCString(),
            updatedAt: new Date().toUTCString(),
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <Button onClick={() => navigate('/')}>Online Store</Button>
            <Button onClick={logIn}>Log In</Button>
        </div>
    )
};