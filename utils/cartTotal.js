
const cartTotal = async (user) => {
    if (user && user.cart) {
        user.cart.forEach((item) => {
            const product=item.product;
            let price = product.price || 0; 
            let discount = product.discount || 0; 
            let quantity = item.quantity || 1; 
            let total = price * quantity - discount * quantity + 20; 

            
            item.total = total; 
            console.log("Total is", item.total);
        });

       
        await user.save();
    }
};

module.exports.cartTotal = cartTotal;
