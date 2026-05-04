import MainRouter from "./MainRouter";
import CarouselRouter from "./CarouselRouter";

const isOnsite = 
import.meta.env.VITE_ENVIRONMENT === "onsite" && true


function Router() {
  return (
    <>
    {isOnsite 
      ? (
        <CarouselRouter />
      ) : (
          <MainRouter />
      )}
    </>
  );
}

export default Router;