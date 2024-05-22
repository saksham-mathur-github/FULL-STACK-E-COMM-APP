namespace EComm_2.Models
{
    public class OrderDetails
    {
        public List<OrderItem> Items { get; set; }
    }

    public class OrderItem
    {
        public string ProductName { get; set; }
        public int Quantity { get; set; }
    }

}

