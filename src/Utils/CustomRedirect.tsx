import { useEffect, FC } from "react";
import { useHistory, useLocation } from "react-router";

const CustomRedirect: FC<{}> = () => {
  const location = useLocation();
  const history = useHistory();

  const { from } = (location.state as { from: string }) || {
    from: "/home",
  };

  useEffect(() => {
    if (from !== "/home") {
      history.replace(from);
    } else {
      history.push(from);
    }
  }, []);

  return <></>;
};

export default CustomRedirect;
