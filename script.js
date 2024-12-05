function calculateBurnout() {
  const form = document.getElementById('burnoutForm');
  const formData = new FormData(form);

  let totalScore = 0;
  let emotionalExhaustionScore = 0;
  let personalAccomplishmentScore = 0;
  let depersonalisationScore = 0;

  // Define the question groups
  const emotionalExhaustionQuestions = [2, 4, 8, 10, 12];
  const personalAccomplishmentQuestions = [1, 6, 7, 9, 11];
  const depersonalisationQuestions = [3, 5, 13, 14, 15];

  // Loop through the questions to calculate scores
  for (let i = 1; i <= 15; i++) {
    const answer = formData.get(`q${i}`);
    if (!answer) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const score = parseInt(answer, 10);
    totalScore += score;

    if (emotionalExhaustionQuestions.includes(i)) {
      emotionalExhaustionScore += score;
    } else if (personalAccomplishmentQuestions.includes(i)) {
      personalAccomplishmentScore += score;
    } else if (depersonalisationQuestions.includes(i)) {
      depersonalisationScore += score;
    }
  }

  // Generate the result text
  let resultText = `<h3>Burnout Risk Analysis</h3>`;
  if (totalScore <= 30) {
    resultText += `<p>Your overall burnout risk is low. Keep maintaining a healthy work-life balance.</p>`;
  } else if (totalScore <= 50) {
    resultText += `<p>Your overall burnout risk is moderate. Consider managing stress and taking breaks.</p>`;
  } else {
    resultText += `<p>Your overall burnout risk is high. Please take steps to reduce stress and seek support from your line manager or EAP.</p>`;
  }

  // Add details for specific dimensions
  resultText += `<h4>Dimension Scores</h4>`;
  resultText += `<p><strong>Emotional Exhaustion:</strong> ${emotionalExhaustionScore} - ${getAdvice('emotional', emotionalExhaustionScore)}</p>`;
  resultText += `<p><strong>Reduced Personal Accomplishment:</strong> ${personalAccomplishmentScore} - ${getAdvice('personal', personalAccomplishmentScore)}</p>`;
  resultText += `<p><strong>Depersonalisation:</strong> ${depersonalisationScore} - ${getAdvice('depersonalisation', depersonalisationScore)}</p>`;

  // Display the result
  document.getElementById('result').innerHTML = resultText;
}

// Function to provide advice based on scores
function getAdvice(type, score) {
  if (score >= 17) {
    if (type === 'emotional') {
      return 'You may experience constant exhaustion, regular brain fog, and  feelings of cynicism. Consider self-care practices like 8 hours or more of sleep exercise daily (even just a 20 minute walk), and stress management, which will be personal to you.';
    } else if (type === 'personal') {
      return 'You may lack motivation or purpose at work or in life. Reflect on your achievements so far (no matter how small), practice mindfulness with regular meditation, and focus on rewarding activities such as beach walks in bracing winds.';
    } else if (type === 'depersonalisation') {
      return 'You may feel distant or disconnected from everyone around you. Try taking time to recharge and practicing regular breaks from work and technology. Reconnecting with nature often helps this dimension of burnout.';
    }
  }
  return 'No significant risk detected.';
}
