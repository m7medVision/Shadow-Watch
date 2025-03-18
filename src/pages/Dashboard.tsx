import MapComponent from "@/components/Map/MapComponent";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Shadow Watch</h1>
        <p className="text-muted-foreground mt-1">
          Interactive crime reporting and tracking system
        </p>
      </header>
      
      <MapComponent />
    </div>
  );
};

export default Dashboard;
