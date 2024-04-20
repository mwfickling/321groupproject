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

        [HttpGet]
        public List<Ingredient> Get() // new
        {
            return Ingredient.GetAllIngredients();
        }

        // GET: api/movies/{id}
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

        // // POST: api/Books
        // [HttpPost]
        // public void Post([FromBody] Recipe value)
        // {
        //     RecipeHandler dh = new RecipeHandler();
        //     dh.SaveRecipe(value);
        // }

        // // PUT: api/Books/5
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
