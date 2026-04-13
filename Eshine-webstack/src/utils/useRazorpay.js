const useRazorpay = () => {
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async ({ amount, name, description, prefill }) => {
    const loaded = await loadRazorpay();

    if (!loaded) {
      alert("Razorpay failed to load. Check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_ScwsopmBNXnhb8", 
      amount: amount * 100,            
      currency: "INR",
      name: "ESHINE",                  
      description: description || "Order Payment",
      image: "Eshine-webstack/public/landing-page/srcimgs/Eshine-Logo.png",              
      
      handler: function (response) {
        
        console.log("Payment Success:", response);
        alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
        
      },
      prefill: {
        name: prefill?.name || "",
        email: prefill?.email || "",
        contact: prefill?.contact || "",
      },
      theme: {
        color: "#000000",              
      },
      modal: {
        ondismiss: () => {
          console.log("Payment modal closed");
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error("Payment Failed:", response.error);
      alert(`Payment Failed: ${response.error.description}`);
    });

    rzp.open();
  };

  return { initiatePayment };
};

export default useRazorpay;