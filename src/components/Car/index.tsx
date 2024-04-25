import { FC } from "react";
import "./index.css";

interface CarProps {
  image: string;
  title: string;
  start_production: number;
  class: string;
}

const Car: FC<CarProps> = (props) => {
  return (
    <div className="car-wrapper">
      <img style={{width:'100%', height:'175px'}} src={props.image} alt="img" />
      <h3>{props.title}</h3>
      <h4>{props.start_production}</h4>
      <h4>{props.class}</h4>
    </div>
  );
};

export default Car;
