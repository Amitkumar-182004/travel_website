document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("contactForm");

if (!form) {
    console.error("Form not found ❌");
    return;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    person: formData.get("person"),
    month: formData.get("month"),
    };

    console.log("Sending data:", data); // debug

    try {
    const res = await fetch("http://localhost:5000/api/form", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log("Response:", result);

    alert("Form Submitted ✅");
    form.reset();

    } catch (err) {
    console.error("Error:", err);
    alert("Error submitting form ❌");
    }
});

});