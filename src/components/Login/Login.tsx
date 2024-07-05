import "./Login.css";

type Args = {
  url: string;
};

export default function Login({ url }: Args) {
  return (
    <a className="login" href={url}>
      Login
    </a>
  );
}
