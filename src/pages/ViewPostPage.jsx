import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import appwriteService from "../appwrite/services.js";
import { Container } from "../components/layout";
import { Button } from "../components/ui";

function ViewPostPage() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePost = async () => {
    const done = await appwriteService.deleteArticle(slug);
    if (done) {
      appwriteService.deleteFile(post.featuredImage);
      navigate("/");
    }
  };

  useEffect(() => {
    if (slug) {
      appwriteService.getArticle(slug).then((post) => {
        if (post) setPost(post);
      });
    } else navigate("/");
  }, [slug, navigate]);

  console.log(post);
  return post ? (
    <Container className="p-8 bg-gray-300 m-4 rounded-2xl">
      <div className="w-full mb-6 flex justify-center">
        <h1 className="text-5xl font-bold">{post.title}</h1>
      </div>
      <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="rounded-xl"
        />
        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className="w-10/12 mx-auto">{parse(post.content)}</div>
    </Container>
  ) : null;
}

export default ViewPostPage;
