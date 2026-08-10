document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('observation-form');


  const list = document.getElementById('observation-list');

  form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const formData = new FormData(form);
    const body = {
      treeId: formData.get('treeId'),
      phenophase: formData.get('phenophase'),
      date: formData.get('date'),
    };
    const percent = formData.get('percent');
    if (percent) body.percent = Number(percent);

    const response = await fetch('/observations', {
      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify(body),
    });

    if (!response.ok) {

      const err = await response.json().catch(() => ({}));
      alert(err.error || 'Failed to create observation');
      return;
    }

    const observation = await response.json();
    const li = document.createElement('li');
    li.id = `obs-${observation.id}`;
    li.dataset.id = observation.id;
    li.className = 'flex flex-wrap items-center gap-3 border-b border-slate-200 py-3 px-2';
    li.innerHTML = `
      <span class="font-mono text-sm font-semibold text-slate-800">${observation.treeId}</span>
      <span class="inline-block rounded-full px-2 py-1 text-xs font-medium bg-slate-100 text-slate-800">${observation.phenophase}</span>
      <span class="text-sm text-slate-600">${observation.date}</span>
      <span class="text-sm text-slate-600">${observation.percent != null ? observation.percent + '%' : '—'}</span>
      <span class="ml-auto">
        <button
          hx-put="/observations/${observation.id}/confirm"
          hx-target="closest li"
          hx-swap="outerHTML"
          class="rounded bg-emerald-500 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-900"
        >Confirm</button>
      </span>
    `;
    list.appendChild(li);

    // HTMX only scans hx- attributes at loadiong; new nodes need to be all processed in a manual way.
    if (window.htmx) {
      window.htmx.process(li);
    }

    form.reset();
  });
});
