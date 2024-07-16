import Loader from '@/components/shared/Loader';
import { useGetUsers } from '@/lib/react-query/queriesAndMutations';
import { Link } from 'react-router-dom';


const AllUsers = () => {
  const {
    data: creators,
    isLoading: isUserLoading,
    
  } = useGetUsers(10);
  // console.log(creators?.documents);
  return (
    
    <div className="explore-container">
      <div className="explore-inner_container">
        <div className="flex w-full gap-2 rounded-lg">
          <img 
            src='/assets/icons/people.svg'
            alt='people'
            className='invert-white'
          />
          <h2 className="h3-bold md:h2-bold ">All Users</h2>
        </div>
        <div className="flex flex-wrap gap-6 mt-3">
          {
            isUserLoading ? (<Loader />) :(
              <ul className="grid-container ">
                {creators?.documents.map((creator) => (
                  <li key={creator.$id} className="relative min-w-30 h-60 border border-gray-700 rounded-lg p-4  ">
                    <Link to={`/profile/${creator.id}`} className="flex flex-col gap-3 justify-center items-center ">
                      <div className="mt-8">
                        <img
                          src={creator.imageUrl || "/assets/icons/profile-placeholder.svg"}
                          alt="profile"
                          className="h-14 w-14 rounded-full "
                        />
                      </div>
                      
                      <div className='gap-2 flex flex-col items-center'>
                        <p className="body-bold">{creator.name}</p>
                        <p className="small-regular text-light-3">@{creator.username}</p>
                      </div> 
                    </Link>
                  </li>
                ))}
              </ul>
            )}
        </div>

      </div>
    </div>
    
  )
}

export default AllUsers