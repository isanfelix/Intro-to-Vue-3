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
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <!-- GIVE :KEY MAKE EVERY ELEMENT LIST HAVE UNIQUE IDENTITY ID -->
         <!-- penamaan property di :style harus mengikuti aturan javascript karena itu style object atau gunakan kebab case 'background-color'-->
        <div 
          v-for="(variant, index) in variants" 
          :key="variant.id" 
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{ backgroundColor: variant.color }"
        >{{ variant.color }}</div>

        <p>{{ description }}</p>
        <!-- LINK -->
        <a :href="url">VUE Quick Start</a>

        <!-- V-ON -->
        <!-- <button class="button" v-on:click="addToCart">Add to Cart</button> -->
        <!-- IN SHORTHAND -->

        <!-- :disabled="!inStock" -->
        <button 
          class="button"
          :class="{ disabledButton: inventory <= 0 }"
          :disabled="inventory <= 0"
          @click="addToCart"
        
        >Add to Cart</button>

        <!-- :disabled="inStock" -->
        <button 
          class="button"
          :disabled="cart <= 0"
          :class="{ disabledButton: cart <= 0 }"
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
    }
  },
  // ES6 Shorthand
    data() {
        return {
            
            product: "Socks",
            brand: "Adidos",
            // image: "./assets/images/socks_green.jpg",
            url: "https://vuejs.org",
            inventory: 10,
            selectedVariant: 0,
            inStock: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                {id: 1, color: 'green', image: './assets/images/socks_green.jpg', qty: 10},
                {id: 2, color: 'blue', image: './assets/images/socks_blue.jpg', qty: 4},
            ],
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        }
    },
    methods: {
        addToCart() {
            // menotice parent event click add to cart (child > parent), 
            // yg di child hanya kirim event, diolah di main js
            this.$emit('add-to-cart')
        
        },
        removeFromCart() {
            this.$emit('remove-from-cart')

        },
        updateVariant(index) {
            this.selectedVariant = index
        }
        // updateImage(variantImage) {
        //     this.image = variantImage

        // }
    },
    // COMPUTING PROPERTIES
    computed: {
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