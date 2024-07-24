import { Button } from "@/registry/new-york/ui/button";
import React, { useState } from "react";

interface RecommendationsProps {
  childNumber: string;
}

const Recommendations: React.FC<RecommendationsProps> = ({ childNumber }) => {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = () => {
    setLoading(true);
    setError(null); // Reset error before fetching

    // Log the childNumber to ensure it's correct
    console.log("Fetching recommendations for child number:", childNumber);

    fetch(`http://100.42.178.17:8800/api/get_child_nutrition_recomendations/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ registration_number: childNumber }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data); // Log the data for debugging
        if (data && data.message) {
          setRecommendations(data.message);
        } else {
          throw new Error("Unexpected response format");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recommendations:", err);
        setError(`Error fetching recommendations: ${err.message}`);
        setLoading(false);
      });
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8 border border-rchs">
      <div className="mt-8">
        <Button
          onClick={fetchRecommendations}
          className="px-4 py-2 bg-rchs text-white rounded hover:bg-blue-500"
        >
          Recommendations
        </Button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {recommendations && (
          <div className="mt-4">
            <h3 className="text-lg font-medium">Nutritional Recommendations</h3>
            <p className="mt-2 whitespace-pre-line">{recommendations}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
