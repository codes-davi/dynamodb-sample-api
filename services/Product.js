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

    getById = async(id) =>{
        let params = {
            TableName: 'products',
            Key:{id}
        }
        try {
            return await dynamoClient.get(params).promise();
        } catch (error) {
            throw Error(error);
        }
    }

    addOne = async(product) =>{
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

    deleteById = async(id) =>{
        let params = {
            TableName: 'products',
            Key:{id}
        }
        try {
            return await dynamoClient.delete(params).promise();
        } catch (error) {
            throw Error(error);
        }
    }

    editById = async(id, product) =>{
        let params = {
            TableName: 'products',
            Key:{id},
            UpdateExpression: `set #TheName = :x, description = :y, price = :z`,
            ExpressionAttributeNames: {
                '#TheName':'name'
            },
            ExpressionAttributeValues: {
                ':x': `${product.name}`,
                ':y': `${product.description}`,
                ':z': `${product.price}`
            }
        }
        try {
            return await dynamoClient.update(params).promise();
        } catch (error) {
            throw Error(error);
        }
    }
}

module.exports = new Product;