import { Container } from "../components/layout";
import PostForm from "../features/post/PostForm";

function AddPostPage() {
  return (
    <Container className="py-8">
      <PostForm />
    </Container>
  );
}

export default AddPostPage;
