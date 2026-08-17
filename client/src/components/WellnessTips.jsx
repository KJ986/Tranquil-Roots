import { useEffect, useState } from "react";

function WellnessTips({ serviceName, category, notes, bookingId, } = req.body) {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 

  useEffect(() => {
    const fetchWellnessTips = async () => {
      try {
        setLoading(true);
        setError("");

         console.log("Sending AI request:", {
        serviceName,
        category,
        notes,
      });

        const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/ai/wellness-tips`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
            serviceName,
              category,
              notes,
              bookingId,
            }),
          }
        );

          
        const data = await response.json();

         


        if (!response.ok) {
          throw new Error(
            data.message || "Unable to generate wellness tips."
          );
        }

        setTips(data.tips);
      } catch (error) {
        console.error(error);

        setError("Wellness tips are temporarily unavailable.");

        setTips([
          "Stay hydrated before your appointment.",
          "Keep your wellness routine gentle before your visit.",
          "Give yourself time to relax before your appointment.",
          "Get plenty of rest the night before.",
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchWellnessTips();
  }, [serviceName, category, notes]);

  if (loading) {
    return (
      <section className="wellness-tips">
        <h4>🌿 AI Wellness Guide</h4>
        <p>Creating your personalized wellness tips...</p>
      </section>
    );
  }

  

  return (
    <section className="wellness-tips">
      <p className="wellness-tips__eyebrow">
        Personalized preparation
      </p>

      <h4>🌿 AI Wellness Guide</h4>

      <p className="wellness-tips__intro">
        Helpful tips for your upcoming {serviceName} appointment:
      </p>

      {error && (
        <p className="wellness-tips__error">
          {error}
        </p>
      )}

      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </section>
  );
}

export default WellnessTips;