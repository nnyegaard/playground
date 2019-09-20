using System;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace common
{
    public class RabbitClient
    {
        private IConnection _connection;
        private IModel _channel;

        public RabbitClient()
        {
            InitRabbit();
        }

        private void InitRabbit()
        {
            var factory = new ConnectionFactory
            {
                UserName = "guest",
                Password = "guest",
                VirtualHost = "/",
                HostName = "localhost",
                Port = 5672,
                DispatchConsumersAsync = true
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.QueueDeclare(queue: "msgKey", durable: false, exclusive: false, autoDelete: false, arguments: null);
        }

        public void Publish(string msg)
        {
            _channel.BasicPublish(exchange: "", routingKey: "msgKey", basicProperties: null, body: Encoding.UTF8.GetBytes(msg));
        }

        public void Subscribe()
        {
            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                var message = Encoding.UTF8.GetString(ea.Body);
                Console.WriteLine($"{DateTime.Now} Received message: {message}");
                _channel.BasicAck(ea.DeliveryTag, false);

            };

            _channel.BasicConsume("msgKey", false, consumer);
        }
    }
}
