import { Text, Button } from "react-native";
import { create } from "../../config/firebase/auth";
import { useContext } from "react";
import UserContext from "../../config/context/user";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <Text>Crear usuario</Text>
      {user.status === "failed" && <Text>El usuario no fue creado</Text>}
      <Button
        onPress={() => {
          create("1@myserver.com", "qq123456").then((response) => {
            const status = response.status === "success" ? "logged" : "failed";
            setUser({ status, data: response.data });
          });
        }}
        title="Crear Usuario"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </>
  );
};

export default Login;
