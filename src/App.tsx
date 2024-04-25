import Pagination from "@mui/material/Pagination";
import "./App.css";
import { useEffect, useState } from "react";
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
  total: number;
}

function App() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [total, setTotal] = useState<number>(10);

  async function getData(limit: number, page: number) {
    try {
      const resp = await fetch(
        `http://localhost:3000/machines?limit=${limit}&&page=${page}`
      );
      const data: ResponseProps = await resp.json();
      setCars(data.results);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData(limit, currentPage);
  }, []);

  useEffect(() => {
    getData(limit, currentPage);
  }, [limit, currentPage]);

  function handleChange(e: React.ChangeEvent<unknown>, count: number) {
    setCurrentPage(count);
  }

  return (
    <div className="wrapper">
      <div className="cars_container">
        {cars.length &&
          cars.map((car) => {
            return (
              <Car
                image={car.image}
                title={car.title}
                start_production={car.start_production}
                class={car.class}
              />
            );
          })}
      </div>
      <div className="footer">
        <Pagination
          onChange={handleChange}
          count={Math.trunc(total / limit)}
          variant="outlined"
          shape="rounded"
        />
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={16}>16</option>
        </select>
      </div>
    </div>
  );
}

export default App;
