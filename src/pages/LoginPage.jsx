import { Container } from "../components/layout";
import Login from "../features/auth/Login";

function LoginPage() {
  return (
    <Container className="py-8">
      <Login />
    </Container>
  );
}

export default LoginPage;
