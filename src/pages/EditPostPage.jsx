import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import appwriteService from "../appwrite/services.js";
import { Container } from "../components/layout";
import PostForm from "../features/post/PostForm";

function EditPostPage() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService
        .getArticle(slug)
        .then((post) => setPost(post))
        .catch((error) => console.error(error.message));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <Container>
      <PostForm post={post} />
    </Container>
  ) : null;
}

export default EditPostPage;
