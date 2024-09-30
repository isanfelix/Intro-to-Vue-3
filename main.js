

// 2# Create Vue App
const app = Vue.createApp(
    // This is  is Option Object
    {
        // ES6 Shorthand, MOVE TO Product Display
        data() {
            return {
                // testing ketika cartX diubah tipenya menjadi array
                // cartX: 0,
                cartX: [],
                // this data will passing to child (PROPS)
                premiumX: true,
                
            }
        },
        methods: {
            updateAddToCart(id) {
                // karena format cartX = ARRAY, gunakan cara ARRAY
                this.cartX.push(id)
                // this.cartX += 1
                
            },
            updateRemoveFromCart(id) {
                // Find the last occurrence of the value (id) in the cart array
                const index = this.cartX.lastIndexOf(id);
                
                // If the value is found, remove it using splice
                if (index !== -1) {
                    this.cartX.splice(index, 1);  // Remove 1 element at the found index
                }

                // this.cartX.pop(id)
                // this.cartX -= 1
                
            },
        },
    })

// app.config.devtools = true;
// app.config.productionTip = false;