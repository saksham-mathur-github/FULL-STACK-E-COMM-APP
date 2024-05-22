using System.Collections.Generic;
using System.Threading.Tasks;
using EComm_2.Models;
using EComm_2.Data_Context;
using Microsoft.EntityFrameworkCore;

namespace EComm_2.Service
{
    public class OrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Order>> GetOrdersAsync()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.FirstOrDefaultAsync(o => o.OrderId == id);
        }

        public async Task<Order> AddOrderAsync(List<Order> orders)
        {
            foreach (var order in orders)
            {
                _context.Entry(order).State = EntityState.Detached; // Detach the entity before reattaching
                _context.Orders.Add(order);
            }

            await _context.SaveChangesAsync();
            return orders.FirstOrDefault(); // Return any order from the list
        }


        private int GenerateOrderId()
        {
            // Logic to generate a unique Order ID, you can implement as per your requirements
            // For simplicity, you can use a timestamp-based ID or a random number
            return new Random().Next(1000, 9999); // Example: Generating a random 4-digit number
        }


        public async Task<Order> UpdateOrderAsync(int id, Order order)
        {
            var existingOrder = await _context.Orders.FindAsync(id);
            if (existingOrder == null) return null;

            existingOrder.ProductId = order.ProductId;
            existingOrder.ProductName = order.ProductName;
            existingOrder.Quantity = order.Quantity;

            await _context.SaveChangesAsync();
            return existingOrder;
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return false;

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
