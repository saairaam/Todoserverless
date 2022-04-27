const AWS=require('aws-sdk');

const fetchTodo = async (event) => {
  
  const dynamodb=new AWS.DynamoDB.DocumentClient();
  const {id} =event.pathParameters

  let todo;
  
  try{
    const results=await dynamodb.get({
        TableName:"TodoTable",
        Key:{id}
    }).promise()
    todo=results.Item;
  }catch(error){
    console.log(error);
  }


  return {
    statusCode: 200,
    body: JSON.stringify(todo),
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  };


};

module.exports={
  handler: fetchTodo
}