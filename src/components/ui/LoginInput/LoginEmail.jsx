//import email from "../../../assets/emial.svg";
import email from "../../../assets/email.png"
import person from "../../../assets/person.svg";
import "./LoginEmail.css";
const LoginEmail = ({ placeholder, icon, type, value, setValue, name }) => {
   let ic;
   ic = icon === "email" ? email : person;
  return (
    <div className="login-input">
      <img src={ic} className="icon-email" />
      <input
      className="email-int"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue((prevInpt) => ({
            ...prevInpt,
            [name]: e.target.value,
          }));
        }}
      />
    </div>
  );
};
export { LoginEmail };


