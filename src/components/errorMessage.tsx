import React, { FC } from "react";
import { Alert } from "react-bootstrap";

interface Props {
  variant: string;
}

const errorMessage: FC<Props> = ({ children, variant = "info" }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 20, color: "red" }}>
      <strong> {children}</strong>
    </Alert>
  );
};

export default errorMessage;
