import MainLayout from "./components/layout/MainLayout";
import Footer from "./pages/Home/Footer/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <MainLayout />
      </main>
      <Footer />
    </div>
  );
}

export default App;
