// ============================================
// THE APPOINTMENT ENGINE™ — Shared JavaScript
// ============================================

// Print / Save as PDF
function printPage() {
  window.print();
}

// Mobile nav toggle
function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (nav) {
    nav.classList.toggle('hidden');
  }
}

// Income Calculator Logic
function calculateIncome() {
  const monthlyGoal = parseFloat(document.getElementById('calc-goal')?.value) || 0;
  const avgCommission = parseFloat(document.getElementById('calc-commission')?.value) || 0;
  const closeRate = parseFloat(document.getElementById('calc-close')?.value) || 0;
  const showRate = parseFloat(document.getElementById('calc-show')?.value) || 0;
  const convRate = parseFloat(document.getElementById('calc-conv')?.value) || 0;

  if (!monthlyGoal || !avgCommission || !closeRate || !showRate || !convRate) {
    return;
  }

  const unitsNeeded = Math.ceil(monthlyGoal / avgCommission);
  const showsNeeded = Math.ceil(unitsNeeded / (closeRate / 100));
  const appointmentsNeeded = Math.ceil(showsNeeded / (showRate / 100));
  const conversationsNeeded = Math.ceil(appointmentsNeeded / (convRate / 100));
  const dailyCalls = Math.ceil(conversationsNeeded / 22); // 22 working days

  const results = document.getElementById('calc-results');
  if (results) {
    results.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
        <div class="bg-[#1B2A4A] text-white rounded-xl p-4">
          <div class="text-3xl font-bold">${dailyCalls}</div>
          <div class="text-sm opacity-80 mt-1">Daily Calls</div>
        </div>
        <div class="bg-[#1B2A4A]/90 text-white rounded-xl p-4">
          <div class="text-3xl font-bold">${conversationsNeeded}</div>
          <div class="text-sm opacity-80 mt-1">Conversations/mo</div>
        </div>
        <div class="bg-[#E8963E] text-white rounded-xl p-4">
          <div class="text-3xl font-bold">${appointmentsNeeded}</div>
          <div class="text-sm opacity-80 mt-1">Appointments/mo</div>
        </div>
        <div class="bg-[#E8963E]/90 text-white rounded-xl p-4">
          <div class="text-3xl font-bold">${showsNeeded}</div>
          <div class="text-sm opacity-80 mt-1">Shows/mo</div>
        </div>
        <div class="bg-[#2ECC71] text-white rounded-xl p-4">
          <div class="text-3xl font-bold">${unitsNeeded}</div>
          <div class="text-sm opacity-80 mt-1">Units Sold/mo</div>
        </div>
      </div>
      <div class="mt-6 p-4 bg-[#1B2A4A]/5 rounded-xl border border-[#1B2A4A]/10">
        <p class="font-semibold text-[#1B2A4A]">Your Daily Plan:</p>
        <p class="text-gray-700 mt-1">Make <strong>${dailyCalls} calls</strong> per day to hit <strong>$${monthlyGoal.toLocaleString()}</strong>/month. That's it. No magic — just math and discipline.</p>
      </div>
    `;
    results.classList.remove('hidden');
  }
}

// Calendar — show day detail
function showDayDetail(day) {
  const allDetails = document.querySelectorAll('.day-detail');
  allDetails.forEach(d => d.classList.add('hidden'));

  const detail = document.getElementById(`day-${day}`);
  if (detail) {
    detail.classList.remove('hidden');
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Tracker — add row
function addTrackerRow() {
  const tbody = document.getElementById('tracker-body');
  if (!tbody) return;

  const today = new Date().toISOString().split('T')[0];
  const row = document.createElement('tr');
  row.className = 'border-b border-gray-200';
  row.innerHTML = `
    <td class="p-3"><input type="date" value="${today}" class="w-full bg-transparent border-0 focus:ring-0"></td>
    <td class="p-3"><input type="number" value="0" min="0" class="w-16 text-center bg-gray-50 rounded border border-gray-200 tracker-calls" onchange="updateTrackerTotals()"></td>
    <td class="p-3"><input type="number" value="0" min="0" class="w-16 text-center bg-gray-50 rounded border border-gray-200 tracker-convos" onchange="updateTrackerTotals()"></td>
    <td class="p-3"><input type="number" value="0" min="0" class="w-16 text-center bg-gray-50 rounded border border-gray-200 tracker-appts" onchange="updateTrackerTotals()"></td>
    <td class="p-3"><input type="number" value="0" min="0" class="w-16 text-center bg-gray-50 rounded border border-gray-200 tracker-shows" onchange="updateTrackerTotals()"></td>
    <td class="p-3"><input type="number" value="0" min="0" class="w-16 text-center bg-gray-50 rounded border border-gray-200 tracker-sales" onchange="updateTrackerTotals()"></td>
  `;
  tbody.appendChild(row);
}

// Tracker — update totals
function updateTrackerTotals() {
  const sum = (selector) => {
    let total = 0;
    document.querySelectorAll(selector).forEach(el => {
      total += parseInt(el.value) || 0;
    });
    return total;
  };

  const setEl = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setEl('total-calls', sum('.tracker-calls'));
  setEl('total-convos', sum('.tracker-convos'));
  setEl('total-appts', sum('.tracker-appts'));
  setEl('total-shows', sum('.tracker-shows'));
  setEl('total-sales', sum('.tracker-sales'));
}
