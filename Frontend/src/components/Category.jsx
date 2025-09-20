import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Category() {
  const { category } = useParams();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/packages/category/${category}`)
      .then(res => res.json())
      .then(data => setPackages(data))
      .catch(() => console.error("Failed to load packages"));
  }, [category]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {packages.map(pkg => (
          <Link key={pkg.pid} to={`/package/${pkg.pid}`}>
            <div className="border rounded-lg shadow p-3 hover:shadow-lg transition">
              <img
                src={encodeURI(pkg.imageUrl)} // ✅ Encode spaces and special characters
                alt={pkg.name}
                className="w-full h-40 object-cover rounded"
                onError={(e) => {
                  e.target.src = "/images/fallback.jpg"; // Fallback if image fails
                }}
              />
              <h2 className="font-semibold mt-2">{pkg.name}</h2>
              <p>{pkg.duration}</p>
              <p className="text-blue-600 font-bold">₹{pkg.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
