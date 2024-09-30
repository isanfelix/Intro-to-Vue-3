app.component('product-display', {
    
    template:
    //ACTIVATE STRING HTML ES6
    /*html*/
    `<div class="product-display">

    <div class="product-container">
      <div class="product-image">
        <!-- Shorthand V-BIND -->
        <img :src="image" alt="" srcset="">
        <!-- <img v-bind:src="image" alt="" srcset=""> -->
      </div>
      <div class="product-info">
        <!-- VARIABLE -->
        <h1>{{ title }}</h1>

        <!-- IF ELSE -->
        <h3>{{ inventory }}</h3>
        <div>
          <p v-if="inventory >= 6 && inventory <= 10">In Stocks</p>
          <p v-else-if="inventory > 0 && inventory <= 5">Almost Sold Out</p>
          <p v-else>Out Stock</p>
        </div>

        <p>Shipping: {{shipping}}</p>

        <!-- FOR LOOP -->
        <!-- <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        -->
        <!-- GIVE :KEY MAKE EVERY ELEMENT LIST HAVE UNIQUE IDENTITY ID -->
         <!-- penamaan property di :style harus mengikuti aturan javascript karena itu style object atau gunakan kebab case 'background-color'-->
        <div 
          v-for="(variant, index) in variants" 
          :key="variant.id" 
          @click="updateVariant(index)"
          class="color-circle"
          :style="{ backgroundColor: variant.color }"
        ></div>

        <!-- <p>{{ description }}</p> -->
        <!-- LINK -->
        <!-- <a :href="url">VUE Quick Start</a> -->

        <!-- V-ON -->
        <!-- <button class="button" v-on:click="addToCart">Add to Cart</button> -->
        <!-- IN SHORTHAND -->

        <!--    :disabled="!inStock" 
                :class="{ disabledButton: inventory <= 0 }"
                :disabled="inventory <= 0"
        -->
        <button 
          class="button"
          
          @click="addToCart"
        
        >Add to Cart</button>

        
        <!--    :disabled="inStock"
        
                :disabled="cart <= 0"
                :class="{ disabledButton: cart <= 0 }"

                MASIH problem kenapa cart sudah di props {{cart}} tapi di dalam definisi ini tidak berjalan
        -->
        <button 
          class="button"
          
          @click="removeFromCart"
          
        >Remove From Cart</button>
      
      </div>
    </div>
  
  </div>`,
  // menurunkan dari parent to child
  props:{
    premium: {
        type: Boolean,
        required: true
    },
    cart: {
        type: Number,
        required: true
    }
  },
  // ES6 Shorthand
    data() {
        return {
            
            product: "Socks",
            brand: "Adidos",
            // image: "./assets/images/socks_green.jpg",
            url: "https://vuejs.org",
            // inventory: 10,
            selectedVariant: 0,
            // inStock: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                {id: 1, color: 'green', image: './assets/images/socks_green.jpg', qty: 10},
                {id: 2, color: 'blue', image: './assets/images/socks_blue.jpg', qty: 5},
            ],
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        }
    },
    methods: {
        addToCart() {
            // menotice parent event click add to cart (child > parent), 
            // yg di child hanya kirim event, diolah di main js
            selectedId = this.variants[this.selectedVariant].id
            this.$emit('add-to-cart', selectedId)
            // this.inventory -= 1
        
        },
        removeFromCart() {
            selectedId = this.variants[this.selectedVariant].id
            this.$emit('remove-from-cart',selectedId)
            // this.inventory += 1

        },
        updateVariant(index) {
            this.selectedVariant = index
            console.log('CALL');
            // this.subtractInventory
            // this.inventory
            // how to update of subtract value on invertory compute
        }
        // updateImage(variantImage) {
        //     this.image = variantImage

        // }
    },
    // COMPUTING PROPERTIES
    computed: {
        subtractInventory() {
            const existCart = this.cart.length
            let subtractTotal = 0
            if (existCart === 0) {                
                return 0
            }
            
            // Initialize an empty object
            countExist = {}
            
            for (let i = 0; i < existCart; i++) {
                const item = this.cart[i]
                // If the item already exists in the object, increment the count
                if (countExist[item]) {
                    countExist[item]++
                } else {
                    // If the item doesn't exist, initialize the count to 1
                    countExist[item] = 1
                }
            }

            console.log(countExist, 'countExist');

            const selectedId = this.variants[this.selectedVariant].id
            // kalo tipe object maka get value dari key index yg diseleksi
            // if (typeof countExist === 'object' && countExist !== null) {
            //     if (selectedId in countExist) {
            //         subtractTotal = countExist[selectedId]
            //     }
            // } 

            if (selectedId in countExist) {
                subtractTotal = countExist[selectedId]
            }
            // else {
            //     // kalo bukan object / nol ya tinggal bypass aja nol nya
            //     subtractTotal = countExist
            // }
            
            console.log(subtractTotal, 'subtractTotal');
            console.log(selectedId,'selectedId');

            return subtractTotal
            
        },
        inventory() {            
            
            return (this.variants[this.selectedVariant].qty) - this.subtractInventory;
        },
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 1000
        }
    }
})