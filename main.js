// 2# Create Vue App
const app = Vue.createApp(
    // This is  is Option Object
    {
        // ES6 Shorthand, MOVE TO Product Display
        data() {
            return {
                cart: 0,
                // this data will passing to child (PROPS)
                premiumX: true,
                
            }
        },
        methods: {
            updateAddToCart() {
                this.cart += 1
                this.inventory -= 1
            },
            updateRemoveFromCart() {
                this.cart -= 1
                this.inventory += 1
            },
        },
    })