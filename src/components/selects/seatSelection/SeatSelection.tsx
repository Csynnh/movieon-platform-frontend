import { Seat } from "../../../views/movieDetail/MovieDetail";

const SeatSelection = (props: {
  data: Seat[];
  name: string;
  onChange: any;
  seatSelected: Seat[];
}) => {
  const { data, name, onChange, seatSelected } = props;
  return (
    <div className={name}>
      {data?.map((item) => {
        if (item.type === name) {
          const isActive = seatSelected.find((seat) => seat.id === item.id);

          return (
            <div
              onClick={!item?.is_placed ? () => onChange(item?.id) : () => {}}
              className={`movie-seat-item ${isActive ? "active" : ""} ${
                item?.is_placed ? "placed" : ""
              }`}
              key={item.id}
            >
              {item.column}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
const SeatGroup = (props: {
  data: Seat[];
  onChangeSeat: any;
  seatSelected: Seat[];
}) => {
  const { data, onChangeSeat, seatSelected } = props;
  return (
    <>
      <SeatSelection
        onChange={onChangeSeat}
        seatSelected={seatSelected}
        name="basic-seat"
        data={data}
      />
      <SeatSelection
        onChange={onChangeSeat}
        seatSelected={seatSelected}
        name="vip-seat"
        data={data}
      />
      <SeatSelection
        onChange={onChangeSeat}
        seatSelected={seatSelected}
        name="dou-seat"
        data={data}
      />
    </>
  );
};
export default SeatGroup;
