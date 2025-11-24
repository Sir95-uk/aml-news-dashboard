async function loadDashboard() {
  try {
    const res = await fetch('agencies.json');
    const data = await res.json();

    const dashboard = document.getElementById('dashboard');
    const filter = document.getElementById('agencyFilter');
    const upcoming = document.getElementById('upcomingDates');

    data.agencies.forEach(agency => {
      // Add option to filter
      const opt = document.createElement('option');
      opt.value = agency.name;
      opt.textContent = agency.name;
      filter.appendChild(opt);

      // Create section
      const sec = document.createElement('section');
      const btn = document.createElement('button');
btn.style.color = "#000"; // black text for visibility;
btn.style.fontWeight = "bold";
btn.style.fontSize = "16px";

      btn.onclick = () => content.style.display = content.style.display === 'block' ? 'none' : 'block';

      const content = document.createElement('div');
      content.className = 'content';
      content.innerHTML = `
        <strong>News & Summary:</strong>
        <ul>
          ${agency.news.map((n,i) => `<li>${n}: ${agency.summary[i] || ''}</li>`).join('')}
        </ul>
        <strong>Priorities:</strong>
        <ul><li>${agency.priorities.join('</li><li>')}</li></ul>
      `;

      sec.appendChild(btn);
      sec.appendChild(content);
      dashboard.appendChild(sec);

      // Upcoming dates
      agency.importantDates.forEach(d => {
        const p = document.createElement('p');
        p.textContent = `${agency.name}: ${d}`;
        upcoming.appendChild(p);
      });
    });

    document.getElementById('merCountdown').textContent = `⏳ FATF MER 2027 in ${daysUntilMER()} days`;
  } catch(e) {
    console.error(e);
    alert('Error loading agencies.json — check file name & structure in repo.');
  }
}

function daysUntilMER() {
  const mer = new Date('2027-01-01');
  const now = new Date();
  const diff = mer - now;
  return Math.ceil(diff / (1000*60*60*24));
}

loadDashboard();

