function WellnessTips({ serviceName }) {
  const tips = [
    "Stay hydrated before your appointment.",
    "Avoid heavy styling products 24 hours beforehand.",
    "Massage your scalp gently the night before.",
    "Get plenty of rest before your visit.",
  ];

  return (
    <section className="wellness-tips">
      <p className="wellness-tips__eyebrow">
        Personalized preparation
      </p>

      <h4>🌿 AI Wellness Guide</h4>

      <p className="wellness-tips__intro">
        Helpful tips for your upcoming {serviceName} appointment:
      </p>

      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </section>
  );
}

export default WellnessTips;