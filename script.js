const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}
document.querySelector('#searchButton')?.addEventListener('click', () => showToast('Property search completed.'));
document.querySelector('#filterButton')?.addEventListener('click', () => showToast('Filters are ready to refine your ledger results.'));
document.querySelector('#draftButton')?.addEventListener('click', () => showToast('Transfer request saved as a draft.'));
document.querySelector('#continueButton')?.addEventListener('click', () => { window.location.href = './new-owner.html'; });
document.querySelector('#backButton')?.addEventListener('click', () => { window.location.href = './index.html'; });
document.querySelector('#approvalButton')?.addEventListener('click', () => { window.location.href = './buyer-approval.html'; });
document.querySelector('#newOwnerBackButton')?.addEventListener('click', () => { window.location.href = './new-owner.html'; });
document.querySelector('#appointmentButton')?.addEventListener('click', () => { window.location.href = './lro-appointment.html'; });
document.querySelector('#sendApprovalButton')?.addEventListener('click', () => showToast('Secure buyer approval request sent.'));
document.querySelector('#resendButton')?.addEventListener('click', () => showToast('A new approval link has been generated.'));
document.querySelector('#buyerBackButton')?.addEventListener('click', () => { window.location.href = './buyer-approval.html'; });
document.querySelector('#confirmAppointmentButton')?.addEventListener('click', () => showToast('Appointment confirmation is ready for final submission.'));
document.querySelectorAll('.calendar-day.available').forEach((day) => day.addEventListener('click', () => { document.querySelectorAll('.calendar-day').forEach((item) => item.classList.remove('chosen')); day.classList.add('chosen'); showToast(`Selected appointment date: ${day.dataset.date}.`); }));
document.querySelectorAll('.time-slot').forEach((slot) => slot.addEventListener('click', () => { document.querySelectorAll('.time-slot').forEach((item) => item.classList.remove('selected')); slot.classList.add('selected'); showToast(`Selected ${slot.textContent.trim()} appointment slot.`); }));
