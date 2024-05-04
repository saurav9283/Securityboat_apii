import Movie from "./Movie";
import Screen from "./Screen";

const Admin = () => {
  return (
    <div className="items-center">
      <h1 className="font-bold text-[30px] p-4">Welcome to Dashboard</h1>
      <div className="flex  items-center justify-center gap-10">
        <Screen />
        <Movie />
      </div>
    </div>
  );
};

export default Admin;
