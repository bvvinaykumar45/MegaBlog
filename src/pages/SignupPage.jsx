import { Container } from "../components/layout";
import SignUp from "../features/auth/SignUp";

function SignupPage() {
  return (
    <Container className="py-8">
      <SignUp />
    </Container>
  );
}

export default SignupPage;
