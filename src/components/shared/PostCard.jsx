import { Link } from "react-router";
import appwriteService from "../../appwrite/services";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full rounded-xl bg-gray-100 p-4 flex flex-col items-center gap-4">
        <figure className="w-full flex justify-center items-center rounded-t-xl overflow-hidden">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
        </figure>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
