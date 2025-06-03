import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "@/components/shared/PostStats";
import { useUserContext } from "@/context/AuthContext";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <div>
      {posts.length === 0 ? (
        <p className="mt-4 text-gray-500">It feels light 🌤️ No posts here yet!</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <li key={post.$id} className="relative min-w-80 h-80">
              <Link to={`/posts/${post.$id}`} className="grid-post_link">
                <img
                  src={post.imageUrl}
                  alt="post"
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="grid-post_user absolute bottom-2 left-2 right-2 bg-black/50 text-white p-2 rounded-md flex items-center justify-between">
                {showUser && (
                  <div className="flex items-center gap-2 flex-1">
                    <img
                      src={
                        post?.creator?.imageUrl ||
                        "/assets/icons/profile-placeholder.svg"
                      }
                      alt="creator"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="line-clamp-1 text-sm">
                      {post?.creator?.name || "Unknown"}
                    </p>
                  </div>
                )}
                {showStats && user?.id && (
                  <PostStats post={post} userId={user.id} />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GridPostList;
