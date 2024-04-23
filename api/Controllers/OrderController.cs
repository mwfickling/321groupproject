using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using _321groupproject.data;

namespace api.Controllers
{
    [Route("api/Order")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        [HttpGet]
        public List<Order> Get() // new
        {
            return Order.GetAllOrders();
        }

        [HttpGet("user/{userId}")]
        public ActionResult<List<Order>> GetOrdersByUserId(int userId)
        {
            var orders = Order.GetOrdersByUserId(userId);

            if (orders == null || orders.Count == 0)
            {
                return NotFound(); // No orders found for the given user
            }

            return orders;
        }
        // GET: api/movies/{id}
        [HttpGet("{id}")]
        public ActionResult<Order> Get(int id)
        {
            var order = Order.GetOrderById(id);

            if (order == null)
            {
                return NotFound(); // Recipe not found
            }

            return order;
        }

        // POST: api/Books
        [HttpPost]
        public void Post([FromBody] Order value)
        {
            OrderHandler dh = new OrderHandler();
            dh.SaveOrder(value);
        }

        [HttpGet("highestOrderID")]
        public ActionResult<int> GetHighestOrderID()
        {
            var allOrders = Order.GetAllOrders();

            if (allOrders == null || allOrders.Count == 0)
            {
                return NotFound(); // No orders found
            }

            int highestOrderID = allOrders.Max(order => order.orderID);
            return highestOrderID;
        }

        // PUT: api/Books/5
        // [HttpPut("{id}")]
        // public void Put([FromBody] Recipe value)
        // {
        //     RecipeHandler dh = new RecipeHandler();
        //     dh.UpdateRecipe(value);
        // }

        // // DELETE: api/Books/5
        // [HttpDelete("{id}")]
        // public void Delete(int id)
        // {
        //     RecipeHandler dh = new RecipeHandler();
        //     dh.DeleteRecipe(id);
        // }
    }
}
