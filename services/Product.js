const dynamoClient = require('../dbconfig/dynamodb');

class Product{

    getAll = async() =>{
        let params = {
            TableName: 'products'
        };
        try {
            return await dynamoClient.scan(params).promise();
        } catch (error) {
            throw new Error(error);   
        }
    }

    addProduct = async(product) =>{
        let params = {
            TableName: 'products',
            Item: product
        };
        try {
            return await dynamoClient.put(params).promise();
        } catch (error) {
            throw Error(error);
        }
    }
}

module.exports = new Product;