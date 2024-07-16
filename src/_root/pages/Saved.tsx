
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations"
import { Models } from "appwrite";
import { Link } from "react-router-dom";


const Saved = () => {
  const {data:user,isPending:isUserLoading}  = useGetCurrentUser();
//  console.log(user)
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <div className="flex w-full gap-2 rounded-lg">
          <img 
            src='/assets/icons/save.svg'
            alt='people'
            className='invert-white'
            width={25}
            height={14}
          />
          <h2 className="h3-bold md:h2-bold ">Saved Posts</h2>
        </div>
        <div className="flex-between w-full max-w-5xl mt-16 mb-7">
          <h3 className="body-bold md:h3-bold">Posts</h3>

          <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
            <p className="small-medium md:base-medium text-light-2">All</p>
            <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
          </div>
        </div>  
        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          {isUserLoading ? (
            <Loader/>
          ) : 
            (
             
            <ul className="grid-container">
              {user?.save.map((sav:Models.Document ) => (
                <li key={sav.$id} className="relative min-w-80 h-80">
                  <Link to={`/posts/${sav.post.$id}`} className="grid-post_link">
                    <img
                      src={sav.post.imageUrl}
                      alt="post"
                      className="h-full w-full object-cover"
                    />
                  </Link>
                </li>   
              ))
            }
          </ul>)
        }  
      </div>
      </div>
    </div>    
  )
}

export default Saved