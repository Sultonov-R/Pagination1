import { useEffect, useState } from "react";
import "./App.css";
import Car from "./components/Car";

interface CarType {
  image: string;
  title: string;
  start_production: number;
  class: string;
}

interface ResponseProps {
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  results: CarType[];
}

function App() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  async function getData(limit: number = 5, page: number) {
    const resp = await fetch(
      `http://localhost:3000/machines?limit=${limit}&&page=${page}`
    );
    const data: ResponseProps = await resp.json();
    setCars([...cars, ...data.results]);
    setFetching(false);
  }

  useEffect(() => {
    if (fetching) {
      getData(10, currentPage);
    }
  }, [fetching, currentPage]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  function scrollHandler(e: Event) {
    const target = e.target as HTMLDocument;
    if (
      target.documentElement.scrollHeight -
        (target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
      setCurrentPage((currentPage) => currentPage + 1);
    }
  }

  return (
    <div className="container">
      {cars.length > 0 &&
        cars.map((car) => {
          return (
            <Car
              image={car.image}
              title={car.title}
              start_production={car.start_production}
              class={car.class}
            ></Car>
          );
        })}
    </div>
  );
}

export default App;
