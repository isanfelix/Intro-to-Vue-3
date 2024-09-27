

// 2# Create Vue App
const app = Vue.createApp(
    // This is  is Option Object
    {
        // ES6 Shorthand, MOVE TO Product Display
        data() {
            return {
                cartX: 0,
                // this data will passing to child (PROPS)
                premiumX: false,
                
            }
        },
        methods: {
            updateAddToCart() {
                this.cartX += 1
                
            },
            updateRemoveFromCart() {
                this.cartX -= 1
                
            },
        },
    })

// app.config.devtools = true;
// app.config.productionTip = false;