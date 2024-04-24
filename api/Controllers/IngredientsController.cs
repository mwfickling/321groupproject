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
    [Route("api/Ingredients")]
    [ApiController]
    public class IngredientsController : ControllerBase
    {
        // GET: api/Ingredients
        [HttpGet]
        public List<Ingredient> Get()
        {
            return Ingredient.GetAllIngredients();
        }

        // GET: api/Ingredients/{id}
        [HttpGet("{id}")]
        public ActionResult<List<Ingredient>> Get(int id)
        {
            var ingredients = Ingredient.GetIngredientsByRecipeID(id);

            if (ingredients.Count == 0)
            {
                return NotFound(); // Ingredients not found for the given recipe ID
            }

            return ingredients;
        }

        [HttpGet("ByName/{name}")]
        public ActionResult<List<Ingredient>> GetByName(string name)
        {
            var ingredients = Ingredient.GetIngredientsByName(name);

            if (ingredients.Count == 0)
            {
                return NotFound(); // Ingredients not found for the given name
            }

            return ingredients;
        }

        // POST: api/Ingredients
        [HttpPost]
        public void Post([FromBody] Ingredient value)
        {
            // Assuming you have a method to add ingredients to the database in your data layer
            IngredientHandler ih = new IngredientHandler();
            ih.SaveIngredient(value);
        }

        // PUT: api/Ingredients/{id}
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Ingredient value)
        {
            // Assuming you have a method to update ingredients in the database in your data layer
            IngredientHandler ih = new IngredientHandler();
            ih.UpdateIngredient(value);
        }

        // DELETE: api/Ingredients/{id}
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            // Assuming you have a method to delete ingredients from the database in your data layer
            IngredientHandler ih = new IngredientHandler();
            ih.DeleteIngredient(id);
        }
    }
}
