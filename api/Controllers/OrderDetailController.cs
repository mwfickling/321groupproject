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
    [Route("api/OrderDetail")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {

        [HttpGet]
        public List<OrderDetail> Get() // new
        {
            return OrderDetail.GetAllOrderDetails();
        }

        // GET: api/movies/{id}
        [HttpGet("{id}")]
        public ActionResult<List<OrderDetail>> Get(int id)
        {
            var orderDetails = OrderDetail.GetOrderDetailsbyId(id);

            if (orderDetails.Count == 0)
            {
                return NotFound(); // Ingredients not found for the given recipe ID
            }

            return orderDetails;
        }

        // POST: api/Books
        [HttpPost]
        public void Post([FromBody] OrderDetail value)
        {
            OrderDetailHandler dh = new OrderDetailHandler();
            dh.SaveOrderDetail(value);
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
