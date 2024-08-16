import "./Login.css";

const BACK_URL = import.meta.env.VITE_BACK_URL;
const CLIENT_ID =
  "263747062879-59dj2atcgvusvh0nuck8msgfp68qi7v7.apps.googleusercontent.com";

export default function Login() {
  return (
    <div className="login_wrapper">
      <video
        className="login_back"
        src="/login_background.mp4"
        autoPlay
        loop
        muted
      ></video>
      <script src="https://accounts.google.com/gsi/client" async></script>
      <div className="login">
        <div
          id="g_id_onload"
          data-client_id={CLIENT_ID}
          data-login_uri={BACK_URL + "/login"}
        ></div>
        <div
          className="g_id_signin"
          data-type="standard"
          data-size="large"
          data-theme="outline"
          data-text="sign_in_with"
          data-shape="rectangular"
          data-logo_alignment="left"
        ></div>
      </div>
    </div>
  );
}
