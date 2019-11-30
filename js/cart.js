let articleUnitCost = 0;
let articleCount = 0;
let shippingPercentage = 0.15;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :( verifica qué pasó.";



function updateSubtotal(){
    let articleSubtotal = document.getElementById("articleSubtotal");
    let articleSubtotalText = document.getElementById("subtotalText");

    var subtotal = Math.round(articleUnitCost * articleCount);
    let subtotalToShow = articles.currency + " " + subtotal;

    articleSubtotal.innerHTML = subtotalToShow;
    articleSubtotalText.innerHTML = subtotalToShow;
}

function updateTotalCosts(){
    let shippingCostHTML = document.getElementById("shippingText");
    let totalHTML = document.getElementById("totalText");

    var subtotal = Math.round(articleUnitCost * articleCount);
    var shippingCost = Math.round(subtotal * shippingPercentage);
    var total = Math.round(subtotal + shippingCost);
    let shippingCostToShow = articles.currency + " " + shippingCost;
    let totalToShow = articles.currency + " " + total

    shippingCostHTML.innerHTML = shippingCostToShow;
    totalHTML.innerHTML = totalToShow;
}


function showPaymentTypeNotSelected(){

}


function hidePaymentTypeNotSelected(){

}

function showArticles(articles){
    const htmlContentToAppend =
    `
    <img src="img/tree1.jpg" width="100" height="100">
    `   
    

        document.getElementById("articleSrc").innerHTML = htmlContentToAppend; 
    }
       
   

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(CART_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
            
              articles = resultObj.data.articles[0];
              
              
            let articleName = document.getElementById("articleName");
            let articleUnitCostHTML = document.getElementById("articleUnitCost");
            let articleCount = document.getElementById("articleCount");

            articleName.innerHTML = articles.name;
            articleUnitCostHTML.innerHTML = articles.currency + " " + articles.unitCost;
            articleCount.innerHTML = articles.count;
            articleUnitCost = articles.unitCost;
        
             showArticles(articles.src);
             
            }
         
     });

     document.getElementById("articleCount").addEventListener("change", function(){
        articleCount = this.value;
          updateSubtotal();   
          
        });
        document.getElementById("goldradio").addEventListener("change", function(){
            shippingPercentage = 0.15;
            updateTotalCosts();
        });
        
        document.getElementById("premiumradio").addEventListener("change", function(){
            shippingPercentage = 0.07;
            updateTotalCosts();
        });
    
        document.getElementById("standardradio").addEventListener("change", function(){
            shippingPercentage = 0.05;
            updateTotalCosts();
        });
        document.getElementById("creditCardPaymentRadio").addEventListener("change", function(){
            let paymentType = document.getElementById("paymentType");
            paymentType.innerHTML = CREDIT_CARD_PAYMENT;
            paymentType.style.color = "black";
        });
        document.getElementById("bankingRadio").addEventListener("change", function(){
            let paymentType = document.getElementById("paymentType");
            paymentType.innerHTML = BANKING_PAYMENT;
            paymentType.style.color = "black";
        });

       
        

    

    //Se obtiene el formulario de dirección del artículo
    var cartForm = document.getElementById("address-info");

     //Se agrega una escucha en el evento 'submit' que será
    //lanzado por el formulario cuando se seleccione 'finalizar compra'.
    cartForm.addEventListener("submit", function(e){

        let count = document.getElementById("articleCount"); 
        let calle = document.getElementById("calle");
        let numero = document.getElementById("numero");
        let esquina = document.getElementById("esquina");
        let CCnumber = document.getElementById("creditCardNumber");
        let CVVnumber = document.getElementById("creditCardSecurityCode");
        let BAnumber = document.getElementById("bankAccountNumber");

        let infoMissing = false;
        

        count.classList.remove('is-invalid');
        calle.classList.remove('is-invalid');
        numero.classList.remove('is-invalid');
        esquina.classList.remove('is-invalid');
        CCnumber.classList.remove('is-invalid');
        CVVnumber.classList.remove('is-invalid');
        BAnumber.classList.remove('is-invalid');

 
       if (articleCount.value === "")
       {
        count.classList.add('is-invalid');
        infoMissing = true;
       }

        if (calle.value === "")
        {
            calle.classList.add('is-invalid');
            infoMissing = true;
        }
        
        
        if (numero.value === "")
        {
            numero.classList.add('is-invalid');
            infoMissing = true;
        }

        
        if (esquina.value === "")
        {
            esquina.classList.add('is-invalid');
            infoMissing = true;
        }

        
   if (paymentType.innerHTML == CREDIT_CARD_PAYMENT)
   {
   
         if  (CCnumber.value === "" || CCnumber.value.length != 13 && CCnumber.value.length !=15 && CCnumber.value.length !=16 )

   {
    CCnumber.classList.add('is-invalid');
    paymentType.style.color = "red";
       infoMissing = true;
   }
   else
{
    paymentType.style.color = "black";
}

            if (CVVnumber.value === "" || CVVnumber.value.length <3 || CVVnumber.value.length >4 )
   {
       CVVnumber.classList.add('is-invalid');
       paymentType.style.color = "red";
       infoMissing = true;
   }
   else
   {
       paymentType.style.color = "black";
   }
   
}

   if (paymentType.innerHTML == BANKING_PAYMENT)
   {
    
   
   if (BAnumber.value === "" || BAnumber.value.length != 14 )
   {
       BAnumber.classList.add('is-invalid');
       paymentType.style.color = "red";
       infoMissing = true;
   }
   else
{
    paymentType.style.color = "black";
}
 
}   


if (paymentType.innerHTML == "No ha seleccionado")
{
    paymentType.style.color = "red";
    infoMissing = true; 
}



        if(!infoMissing)

        {


            getJSONData(CART_BUY_URL).then(function(resultObj){
                let msgToShowHTML = document.getElementById("resultSpan");
                let msgToShow = "";
    
                
                if (resultObj.status === 'ok')
                {
                    msgToShow = resultObj.data.msg;
                }
                else if (resultObj.status === 'error')
                {
                    msgToShow = ERROR_MSG;
                }

                bootbox.alert(msgToShow, null);
            });
        }

        if (e.preventDefault) e.preventDefault();
            return false;
    });
});

