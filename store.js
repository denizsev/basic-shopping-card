
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready();
};

//eger javascript html de nonce yuklenmisse diye kontrol yaptik ready diye fonk ekeldik

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');

for (i =0 ; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    
    button.addEventListener("click", removeCartItem)
   }

   var quantityInputs = document.getElementsByClassName("cart-quantity-input");
   for (i =0 ; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged)
   }
}

//quantity deki ürün sayisini degistirkikenki fosnkiyon
//yani hem num dan baska ifade giremez kulanici ya da 0 ve asagisi bir deger giremez diye yaptik

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal() // fiyat  eklenip cikarildiginda degissin diye coktan yapmistik eklenip cikarildiginda degissin diye 
}









//Remove icin ozel fonksyion

function removeCartItem(event) {  // birazdaha temizledim remove a ozel fonskyion ypatm 
        var buttonClicked =  event.target; //ismini aldik yani : [Log] <button class="btn btn-danger" type="button">REMOVE</button> (store.js, line 8)

        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();  //fonskyonu burda yazmaktansa disarda yaziyorum ivceri cagiriyorum
}

//remove icin ozel fonk ypatim daha temiz olmasi icin
var removeCartItemButtons = document.getElementsByClassName('btn-danger');

for (i =0 ; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    
    button.addEventListener("click", (event) => {
        var buttonClicked =  event.target; //ismini aldik yani : [Log] <button class="btn btn-danger" type="button">REMOVE</button> (store.js, line 8)

        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();  //fonskyonu burda yazmaktansa disarda yaziyorum ivceri cagiriyorum
    });
}


//  shoppingcard ta total in eklenip cikarildiginda degissin diye fonksiyon

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row"); // tekrar bun icinden class ini secmemin sebebi sadece bu divin icindeki .cart-row lari secsin diye yoksa butun html dekin isecer.
    var total = 0;

    for (i =0 ; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]; //ILK ELEEMANINI ALIYORUZ SADECE YANI BU : class="cart-price cart-column"
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];  // class="cart-quantity cart-column"

        var price = parseFloat(priceElement.innerText.replace("$", ""));  // dolari istrmiyoruz onu aldik ici bosla degistirdik ynai silmis olduk cunku dirke num a ihtiayc var icindeki metni aldik ynai : $19.99
        var quantity = quantityElement.value;
        total += price * quantity  
        //parseFloat === string imizi number float a cevirdi cunku bize num hali lazim 
        
        // console.log(typeof(price));   === Number 

         console.log(total); // bize mesela 9.99 luk urun 2 tane aldim o (quantity == sayisi) yan idirek 9.99*2 yaptik bize tam siparis fiyatin iverdi = 19.99
    }
    total = Math.round(total * 100) / 100; // ondalik sayiyi iki basamli hale getirir
    //eger anlamadiysan // yap ve bak ondalik,99999999 olcak onu duzeltmek icin
    document.getElementsByClassName("cart-total-price")[0].innerText = `$${total}`; // birsey cikarinca total in degismesini sagladi yani yerini aliyor innerText ile
}