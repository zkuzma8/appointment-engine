// ============================================
// THE APPOINTMENT ENGINE™ - Shared JavaScript
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
  // Discipline log breakdown
  const freshLeads = Math.ceil(dailyCalls * 0.35);
  const pipeline = Math.ceil(dailyCalls * 0.30);
  const serviceLane = Math.ceil(dailyCalls * 0.20);
  const pastCustomers = dailyCalls - freshLeads - pipeline - serviceLane;
  const dailyTexts = dailyCalls;
  const dailyEmails = Math.max(1, Math.round(dailyCalls * 0.25));

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
        <p class="text-gray-700 mt-1">Make <strong>${dailyCalls} calls</strong> per day to hit <strong>$${monthlyGoal.toLocaleString()}</strong>/month. That's it. No magic - just math and discipline.</p>
      </div>
    `;
    results.classList.remove('hidden');
  }

  // Generate discipline log
  const logContainer = document.getElementById('discipline-log');
  if (logContainer) {
    logContainer.innerHTML = `
      <h3 class="text-xl font-bold text-[#1B2A4A] mb-2">Your Daily Discipline Log</h3>
      <p class="text-gray-500 text-sm mb-6">Print this out. Check each box as you go. ${dailyCalls} calls, ${dailyTexts} texts, ${dailyEmails} emails per day.</p>
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Fresh Leads -->
        <div class="bg-white rounded-xl border border-gray-200 p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-3 h-3 rounded-full bg-[#E74C3C] flex-shrink-0"></div>
            <h4 class="font-bold text-[#1B2A4A]">Fresh Leads</h4>
            <span class="text-xs text-gray-400 ml-auto">35%</span>
          </div>
          <p class="text-xs text-gray-500 mb-3">New internet leads, phone-ups, walk-in follow-ups</p>
          <div class="space-y-2">
            ${buildCheckboxes('Calls', freshLeads)}
            ${buildCheckboxes('Texts', freshLeads)}
            ${buildCheckboxes('Emails', Math.max(1, Math.round(freshLeads * 0.25)))}
          </div>
        </div>
        <!-- Pipeline Follow-Up -->
        <div class="bg-white rounded-xl border border-gray-200 p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-3 h-3 rounded-full bg-[#E8963E] flex-shrink-0"></div>
            <h4 class="font-bold text-[#1B2A4A]">Pipeline Follow-Up</h4>
            <span class="text-xs text-gray-400 ml-auto">30%</span>
          </div>
          <p class="text-xs text-gray-500 mb-3">Customers in your 30-day follow-up sequence</p>
          <div class="space-y-2">
            ${buildCheckboxes('Calls', pipeline)}
            ${buildCheckboxes('Texts', pipeline)}
            ${buildCheckboxes('Emails', Math.max(1, Math.round(pipeline * 0.25)))}
          </div>
        </div>
        <!-- Service Lane -->
        <div class="bg-white rounded-xl border border-gray-200 p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-3 h-3 rounded-full bg-[#3498DB] flex-shrink-0"></div>
            <h4 class="font-bold text-[#1B2A4A]">Service Lane</h4>
            <span class="text-xs text-gray-400 ml-auto">20%</span>
          </div>
          <p class="text-xs text-gray-500 mb-3">Customers in for service - upgrade opportunity</p>
          <div class="space-y-2">
            ${buildCheckboxes('Calls', serviceLane)}
            ${buildCheckboxes('Texts', serviceLane)}
          </div>
        </div>
        <!-- Past Customers -->
        <div class="bg-white rounded-xl border border-gray-200 p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-3 h-3 rounded-full bg-[#1B2A4A] flex-shrink-0"></div>
            <h4 class="font-bold text-[#1B2A4A]">Past Customers</h4>
            <span class="text-xs text-gray-400 ml-auto">15%</span>
          </div>
          <p class="text-xs text-gray-500 mb-3">Equity calls, anniversary calls, referral asks</p>
          <div class="space-y-2">
            ${buildCheckboxes('Calls', pastCustomers)}
            ${buildCheckboxes('Texts', pastCustomers)}
          </div>
        </div>
      </div>
      <div class="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
        <p class="text-sm text-gray-600"><strong>Daily Totals:</strong> ${dailyCalls} calls + ${dailyTexts} texts + ${dailyEmails} emails</p>
      </div>
    `;
    logContainer.classList.remove('hidden');
  }
}

// Build checkbox row for discipline log
function buildCheckboxes(label, count) {
  if (count <= 0) return '';
  let boxes = '';
  for (let i = 0; i < count; i++) {
    boxes += '<input type="checkbox" class="w-4 h-4 rounded border-gray-300 cursor-pointer">';
  }
  return `<div class="flex items-center gap-2 flex-wrap"><span class="text-xs font-semibold text-gray-500 w-12">${label}</span>${boxes}</div>`;
}

// Calendar - filter scripts by channel
function filterChannel(day, channel) {
  const panel = document.getElementById('day-' + day);
  if (!panel) return;
  const scripts = panel.querySelectorAll('.script-item');
  const tabs = panel.querySelectorAll('.channel-tab');

  tabs.forEach(function(tab) {
    tab.classList.remove('bg-[#1B2A4A]', 'text-white');
    tab.classList.add('bg-gray-200', 'text-gray-700');
  });
  const activeTab = panel.querySelector('[data-channel="' + channel + '"]');
  if (activeTab) {
    activeTab.classList.remove('bg-gray-200', 'text-gray-700');
    activeTab.classList.add('bg-[#1B2A4A]', 'text-white');
  }

  scripts.forEach(function(script) {
    if (channel === 'all' || script.dataset.type === channel) {
      script.classList.remove('hidden');
    } else {
      script.classList.add('hidden');
    }
  });
}

// Calendar - show day detail
function showDayDetail(day) {
  const allDetails = document.querySelectorAll('.day-detail');
  allDetails.forEach(d => d.classList.add('hidden'));

  const detail = document.getElementById(`day-${day}`);
  if (detail) {
    detail.classList.remove('hidden');
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Tracker - add row
function addTrackerRow() {
  const tbody = document.getElementById('tracker-body');
  if (!tbody) return;

  const row = document.createElement('tr');
  row.className = 'border-b border-gray-200';
  row.innerHTML = `
    <td class="p-3"><input type="text" placeholder="MM/DD" class="w-full min-w-[120px] bg-transparent border-0 focus:ring-0"></td>
    <td class="p-3"><input type="number" value="0" min="0" class="w-16 text-center bg-gray-50 rounded border border-gray-200 tracker-calls" onchange="updateTrackerTotals()"></td>
    <td class="p-3"><input type="number" value="0" min="0" class="w-16 text-center bg-gray-50 rounded border border-gray-200 tracker-convos" onchange="updateTrackerTotals()"></td>
    <td class="p-3"><input type="number" value="0" min="0" class="w-16 text-center bg-gray-50 rounded border border-gray-200 tracker-appts" onchange="updateTrackerTotals()"></td>
    <td class="p-3"><input type="number" value="0" min="0" class="w-16 text-center bg-gray-50 rounded border border-gray-200 tracker-shows" onchange="updateTrackerTotals()"></td>
    <td class="p-3"><input type="number" value="0" min="0" class="w-16 text-center bg-gray-50 rounded border border-gray-200 tracker-sales" onchange="updateTrackerTotals()"></td>
  `;
  tbody.appendChild(row);
}

// Tracker - update totals
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
