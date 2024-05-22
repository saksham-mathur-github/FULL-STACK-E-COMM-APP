using Microsoft.AspNetCore.Mvc;
using EComm_2.Models;
using EComm_2.Data_Context;
using Microsoft.EntityFrameworkCore;
using EComm_2.Service;

namespace EComm_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly OrderService _orderService;

        public AdminController(AppDbContext context, OrderService orderService)
        {
            _context = context;
            _orderService = orderService;
        }

        /// <summary>
        [HttpPost("adduser")]
        public async Task<ActionResult<User>> AddUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        /// </summary>
        // Methods for Products
        [HttpPost("add")]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        // GET: api/Admin/Products/5
        [HttpGet("get/{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Admin/Products/5
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Admin/Products/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
        //Category CRUD Methods
        [HttpPost("addCategory")]
        public async Task<ActionResult<Category>> AddCategory(Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.CategoryId }, category);
        }

        // GET: api/Admin/Categories/5
        [HttpGet("getCategory/{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Admin/Categories/5
        [HttpPut("updateCategory/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, Category category)
        {
            if (id != category.CategoryId)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Admin/Categories/5
        [HttpDelete("deleteCategory/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
        [HttpGet("getCategories")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }
        [HttpGet("products/category/{categoryName}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(string categoryName)
        {
            var products = await _context.Products
                .Where(p => p.Category.CategoryName == categoryName)
                .ToListAsync();

            if (products == null)
            {
                return NotFound();
            }

            return products;
        }

        // GET: api/Admin/Orders
        [HttpGet("Orders")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _orderService.GetOrdersAsync();
        }

        // GET: api/Admin/Orders/5
        [HttpGet("Orders/{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }


        // POST: api/Admin/Orders
        [HttpPost("Orders")]
        public async Task<ActionResult<Order>> AddOrder([FromBody] List<Order> orders)
        {
            if (orders.Any(order => order.ProductId == 0))
            {
                return BadRequest("Please provide a valid ProductId for the order.");
            }

            await _orderService.AddOrderAsync(orders);

            return Ok("Orders placed Successfully");
        }



        // PUT: api/Admin/Orders/5
        [HttpPut("Orders/{id}")]
        public async Task<IActionResult> UpdateOrder(int id, Order order)
        {
            var updatedOrder = await _orderService.UpdateOrderAsync(id, order);
            if (updatedOrder == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE: api/Admin/Orders/5
        [HttpDelete("Orders/{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            bool deleted = await _orderService.DeleteOrderAsync(id);
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
        
    }
}
