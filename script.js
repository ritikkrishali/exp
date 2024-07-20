document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const expiryDate = document.getElementById('expiryDate').value;

    addProduct(productName, productQuantity, expiryDate);
    document.getElementById('productForm').reset();
});

function addProduct(name, quantity, expiry) {
    const productTable = document.getElementById('productTable').querySelector('tbody');
    const row = document.createElement('tr');

    const today = new Date();
    const expiryDate = new Date(expiry);
    const timeDiff = expiryDate - today;
    const daysToExpiry = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysToExpiry <= 7) {
        row.classList.add('expiring-soon');
        showNotification(name, daysToExpiry);
    }

    row.innerHTML = `
        <td>${name}</td>
        <td>${quantity}</td>
        <td>${expiry}</td>
    `;

    productTable.appendChild(row);
}

function showNotification(productName, daysToExpiry) {
    const notificationContainer = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerText = `Warning: ${productName} is expiring in ${daysToExpiry} day(s).`;

    notificationContainer.appendChild(notification);

     
}
