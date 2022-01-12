import { useContext } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { authContext } from "../../Utils/Authcontext";

function SsoLogin() {
  const { signIn } = useContext(authContext);
  const { token } = useParams<{ token: string }>();
  const history = useHistory();
  signIn(token);
  history.replace("/protected");

  return <></>;
}

export default SsoLogin;
