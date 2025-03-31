"use client";

import { useEffect, useState } from "react";
import "../styles/vendorlist.css";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/vendors");
        if (!response.ok) {
          throw new Error("Failed to fetch vendors");
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  if (loading) return <p>Loading vendors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="vendor-list">
      {vendors.length > 0 ? (
        vendors.map((vendor) => (
          <div key={vendor._id} className="vendor-card">
            <h3>{vendor.name}</h3>
            <p>{vendor.description}</p>
            <p>Category: {vendor.category}</p>
            <p>Location: {vendor.location.coordinates.join(", ")}</p>
          </div>
        ))
      ) : (
        <p>No vendors found.</p>
      )}
    </div>
  );
};

export default VendorList;
