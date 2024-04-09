import Hero from "@/components/Hero";
import CarLists from "@/components/Home";
import { getServerSession } from "next-auth";
import { authOptions } from "../libs/authOptions";
import getUser from "@/libs/getUser";

export default async function Home() {
  const session = await getServerSession(authOptions);
  let isLoggedIn = false;

  if (session) {
    const userProfile = await getUser(session?.user.token);
    var username = userProfile.data.name;
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  return (
    <main className="overflow-hidden">
      {session ? (
        <Hero loggedIn={isLoggedIn} username={username} />
      ) : (
        <Hero loggedIn={isLoggedIn} />
      )}
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        {session ? 
          null
          :
          <div className="home__text-container">
            <h1 className="text-4xl font-extrabold">Car Catalog</h1>
            <p>Explore the cars you might like</p>
          </div>
        }
        
        <CarLists />
      </div>
    </main>
  );
}
