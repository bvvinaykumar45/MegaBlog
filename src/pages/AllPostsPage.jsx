import { useState, useEffect } from "react";

import appwriteService from "../appwrite/services.js";
import { Container } from "../components/layout";
import { PostCard } from "../components/shared";

function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getArticles([]).then((posts) => {
      if (posts) {
        setPosts(posts.rows);
      }
    });
  }, []);
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

export default AllPostsPage;
