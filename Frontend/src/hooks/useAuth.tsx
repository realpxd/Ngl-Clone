import { Navigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const RequiredAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequiredAuth;