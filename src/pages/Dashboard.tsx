import MapComponent from "@/components/Map/MapComponent";

const Dashboard = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden">
      <MapComponent />
    </div>
  );
};

export default Dashboard;
