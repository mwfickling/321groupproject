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
    [Route("api/Customers")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        [HttpGet]
        public List<Customer> Get() // new
        {
            return Customer.GetAllCustomers();
        }

        // GET: api/movies/{recipeID}
        [HttpGet("{userID}")]
        public ActionResult<Customer> Get(int userID)
        {
            var customer = Customer.GetCustomerById(userID);

            if (customer == null)
            {
                return NotFound(); // Recipe not found
            }

            return customer;
        }

        [HttpGet("getCustomerByEmail")]
        public ActionResult<Customer> GetCustomerByEmail(string email)
        {
            // Call the GetCustomerByEmail method from the Customer class
            var customer = Customer.GetCustomerByEmail(email);
            if (customer != null)
            {
                // Return the customer details if found
                return Ok(customer);
            }
            else
            {
                // Return 404 Not Found if customer with the given email is not found
                return NotFound();
            }
        }

        // POST: api/Books
        [HttpPost]
        public void Post([FromBody] Customer value)
        {
            CustomerHandler dh = new CustomerHandler();
            dh.SaveCustomer(value);
        }

        // PUT: api/Books/5
        [HttpPut("{userID}")]
        public void Put([FromBody] Customer value)
        {
            CustomerHandler dh = new CustomerHandler();
            dh.UpdateCustomer(value);
        }

        // DELETE: api/Books/5
        [HttpDelete("{userID}")]
        public void Delete(int userID)
        {
            CustomerHandler dh = new CustomerHandler();
            dh.DeleteCustomer(userID);
        }
    }
}
