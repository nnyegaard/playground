using System;
using System.Text;
using RabbitMQ.Client;

namespace provider
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World, from provider!");
            var factory = new ConnectionFactory
            {
                UserName = "guest",
                Password = "guest",
                VirtualHost = "/",
                HostName = "localhost",
                Port = 5672
            };

            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();

            channel.QueueDeclare(queue: "msgKey", durable: false, exclusive: false, autoDelete: false, arguments: null);



            var body = Encoding.UTF8.GetBytes("Hello world!");

            channel.BasicPublish(exchange: "", routingKey: "msgKey", basicProperties: null, body: body);
            Console.WriteLine("Message send!");

            Console.WriteLine("Pres a key to close");
            Console.ReadKey();
        }
    }
}
