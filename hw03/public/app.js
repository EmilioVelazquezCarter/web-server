const form = document.querySelector("#reading-form");
const message = document.querySelector("#message");
const readings = document.querySelector("#readings");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const response = await fetch("/readings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cityId: Number(formData.get("cityId")),

      aqi: Number(formData.get("aqi"))
    })
  });

  const result = await response.json();

  if (!response.ok) {
    message.textContent = result.error;
    return;
  }

  const item = document.createElement("div");
  item.className = "reading-item";

  const categoryClass = `category-${result.category.replaceAll(" ", "-")}`;

  item.innerHTML = `
    <span>City ${result.cityId}: AQI ${result.aqi}</span>

    <strong class="${categoryClass}">${result.category}</strong>
  `;

  readings.prepend(item);
  message.textContent = "Reading added.";




  form.reset();
});
