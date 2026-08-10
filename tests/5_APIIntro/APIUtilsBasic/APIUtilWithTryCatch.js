
class APIUtilWithTryCatch{
constructor(apiContext,loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
              {
                 data:this.loginPayload
              });
                // Check if the request failed
                if (!loginResponse.ok()) {
                    console.error(`Request failed with status: ${loginResponse.status()}`);
                    console.error(`Error text: ${loginResponse.statusText()}`);
                    
                    // Optional: Print the error message returned by the server body
                    const errorBody = await loginResponse.text();
                    console.error(`Server error details: ${errorBody}`);        
                    throw new Error('Failed to create order');
                }      
              
        //expect(loginResponse.ok()).toBeTruthy();      
        const loginResponseJson = await loginResponse.json();
        console.log(loginResponseJson);
        const token = loginResponseJson.token;
        console.log(token);
        return token;



    }

    async createOrder(orderPayload){
        const response = {};
        response.token = await this.getToken();

        try{
            const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data : orderPayload,
                headers:{
                            'Authorization' : response.token,
                            'Content-Type'  : 'application/json'
                        },
            });
            if (orderResponse.ok()) {
                const data = await orderResponse.json();
                console.log('Order created successfully:', data);
            } else {
                console.error('API returned an error status:', orderResponse.status());
            }

            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            const orderID = orderResponseJson.orders[0];
            response.orderID = orderID;
            return response;  

            } catch (error) {
            // Catches network disconnects, timeouts, or invalid URLs
            console.error('A critical network error occurred:', error.message);
            }
        


      
    }


}

module.exports = {APIUtilWithTryCatch}