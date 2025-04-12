import GoogleButton from "react-google-button";
import "./Login.css";

const BACK_URL = import.meta.env.VITE_BACK_URL;
export default function Login() {
  return (
    <div className="login_wrapper">
      <video
        className="login_back"
        src="/login_background.webm"
        autoPlay
        loop
        muted
      ></video>
      <a className="login" href={BACK_URL + "/login"}>
        <GoogleButton />
      </a>
    </div>
  );
}
