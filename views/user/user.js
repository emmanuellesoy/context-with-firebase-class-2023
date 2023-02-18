import { Text, Button } from "react-native";
import { useContext } from "react";
import UserContext from "../../config/context/user";
import Login from "../login";

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  if (user.status !== "logged") return <Login />;
  return (
    <>
      <Text>Perfil de usuario</Text>
      <Button
        onPress={() => {
          setUser({
            status: "no-session",
            data: {},
          });
        }}
        title="Log Out"
      />
    </>
  );
};

export default UserProfile;
