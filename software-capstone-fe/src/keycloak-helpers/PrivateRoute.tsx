import { useKeycloak } from "@react-keycloak/web";

interface IPrivateRoute {
    children: any;
}

const PrivateRoute = ({ children }: IPrivateRoute) => {
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? children : null;
};

export default PrivateRoute;