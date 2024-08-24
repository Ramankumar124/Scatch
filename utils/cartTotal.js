
const cartTotal = async (user) => {
    if (user && user.cart) {
        user.cart.forEach((product) => {
            let price = product.price || 0; 
            let discount = product.discount || 0; 
            let quantity = product.quantity || 1; 
            let total = price * quantity - discount * quantity + 20; 

            
            product.total = total; 
            console.log("Total is", total);
        });

       
        await user.save();
    }
};

module.exports.cartTotal = cartTotal;
