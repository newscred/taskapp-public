import { useParams } from "react-router-dom";

type TaskParams = {
  id: string;
};

export function Task() {
  let { id } = useParams<TaskParams>();
  return (
    <><div>Task: {id}</div></>
  );
}
