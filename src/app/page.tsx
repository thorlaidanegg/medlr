import Table from "../components/Table" 
import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <main className="flex flex-col justify-between ">
      <Navbar/>
      <div className="mt-10">
      <Table/>
      </div>
    </main>
  );
}
