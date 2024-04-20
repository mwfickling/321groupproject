namespace api.model
{
    public class Orders
    {
        public int orderId { get; set; }
        public int userId { get; set; }
        public string orderDate { get; set; }
        public string shippedDate { get; set; }
        
    }
}