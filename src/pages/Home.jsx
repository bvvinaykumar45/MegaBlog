import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

import appwriteService from "../appwrite/services";
import { Container } from "../components/layout";
import PostCard from "../components/shared/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getArticles().then((posts) => {
      if (posts) setPosts(posts.rows);
    });
  }, [setPosts]);

  if (!authStatus) {
    return (
      <Container className="flex flex-wrap justify-center flex-1">
        <div className="p-2 flex items-center">
          <h1 className="text-2xl font-bold hover:text-gray-500">
            Login to read posts
          </h1>
        </div>
      </Container>
    );
  } else if (posts.length === 0) {
    return (
      <Container className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl font-bold hover:text-gray-500">
          No posts to show
        </h1>
        <div className="p-5 text-gray-700">
          You can create your own post -{" "}
          <span className="font-extrabold hover:text-gray-500">
            <Link to="/add-post">Create Post</Link>
          </span>
        </div>
      </Container>
    );
  } else {
    return (
      <Container>
        <div className="flex flex-wrap w-full gap-3 p-8">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    );
  }
}

export default Home;
