import { Alert } from "react-bootstrap";

const Message = ({ variant= "info", children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};
// Message.defaultProps = {
//   varient: "info",
// };

export default Message;
