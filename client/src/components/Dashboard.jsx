import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "" });
  const [loans, setLoans] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Get user info from localStorage
    const firstName = localStorage.getItem("firstName") || "Guest";
    const lastName = localStorage.getItem("lastName") || "";
    setUserInfo({ firstName, lastName });

    // Simulated loan data (instead of fetching from Firestore)
    const storedLoans = JSON.parse(localStorage.getItem("loans")) || [];
    setLoans(storedLoans);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const approved = loans.filter((l) => l.status === "approved").length;
  const pending = loans.filter((l) => l.status === "pending").length;
  const rejected = loans.filter((l) => l.status === "rejected").length;

  const ChartData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "Loan Status",
        data: [approved, pending, rejected],
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
      },
    ],
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-blue-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-8">LoanSphere</h2>
        <nav className="space-y-4">
          <button onClick={() => navigate("/dashboard")} className="block w-full text-left hover:underline">Overview</button>
          <button onClick={() => navigate("/loan-request")} className="block w-full text-left hover:underline">Request Loan</button>
          <button onClick={() => navigate("/loan-history")} className="block w-full text-left hover:underline">Loan History</button>
          <button onClick={handleLogout} className="block w-full text-left hover:underline text-red-400">Log Out</button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-8">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold">
            Welcome, {userInfo.firstName} {userInfo.lastName} 👋
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-black"} text-white`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <h3 className="text-gray-500 dark:text-gray-300">Available Balance</h3>
            <p className="text-2xl font-bold text-green-600">$10,000.00</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <h3 className="text-gray-500 dark:text-gray-300">Approved Loans</h3>
            <p className="text-2xl font-bold text-blue-600">{approved}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <h3 className="text-gray-500 dark:text-gray-300">Pending Requests</h3>
            <p className="text-2xl font-bold text-yellow-500">{pending}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <h3 className="text-gray-500 dark:text-gray-300">Rejected Requests</h3>
            <p className="text-2xl font-bold text-red-600">{rejected}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">Loan Status Overview</h2>
          <Pie data={ChartData} options={{ responsive: true }} />
        </div>

        {/* Loan History Table */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Loan Activity</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 dark:text-gray-300 border-b">
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {loans.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-400">No loan activity yet.</td>
                </tr>
              ) : (
                loans.slice(0, 5).map((loan, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2">${loan.amount}</td>
                    <td className="py-2 capitalize">{loan.status}</td>
                    <td className="py-2 text-sm">{loan.createdAt || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
