document.addEventListener('DOMContentLoaded', function () {
    const chocolates = document.querySelectorAll('.chocolate');
    const totalPriceDisplay = document.getElementById('totalPrice');
    const confirmBtn = document.getElementById('confirmBtn');
  
    let totalPrice = 0;
    let totalQuantity = 0; // Initialize outside the loop
  
    chocolates.forEach(chocolate => {
      const quantityInput = chocolate.querySelector('.quantity');
      const priceString = chocolate.dataset.price; // Get data-price
  
      // Check if data-price exists and is a valid number
      if (!priceString || isNaN(parseFloat(priceString))) {
        console.error(`Invalid price for chocolate: ${chocolate}`);
        return; // Skip this chocolate if price is invalid
      }
  
      const price = parseFloat(priceString); // Parse valid price to number
  
      quantityInput.addEventListener('change', function () {
        let quantity = parseInt(quantityInput.value);
        quantity = isNaN(quantity) ? 0 : quantity; // Handle NaN inputs
  
        // Check if quantity exceeds maximum allowed (8)
        if (quantity > 8 - totalQuantity) {
          alert('Maximum bundle quantity reached!');
          quantityInput.value = 8 - totalQuantity;
          quantity = 8 - totalQuantity;
        }
  
        const previousQuantity = parseInt(quantityInput.dataset.previousValue) || 0; // Handle missing previousValue
        const quantityChange = quantity - previousQuantity;
  
        // Update totalQuantity directly within change event listener
        totalQuantity += quantityChange;
  
        const priceChange = quantityChange * price;
        totalPrice += priceChange;
  
        totalPriceDisplay.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        quantityInput.dataset.previousValue = quantity;
      });
    });
  
    confirmBtn.addEventListener('click', function () {
      alert(`Your total price is: $${totalPrice.toFixed(2)}`);
    });
  });
  
  