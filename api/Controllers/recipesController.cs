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
    [Route("api/Recipes")]
    [ApiController]
    public class RecipesController : ControllerBase
    {

        [HttpGet]
        public List<Recipe> Get() // new
        {
            return Recipe.getAllRecipes();
        }

        // GET: api/movies/{id}
        [HttpGet("{id}")]
        public ActionResult<Recipe> Get(int id)
        {
            var recipe = Recipe.GetRecipeFromDatabaseById(id);

            if (recipe == null)
            {
                return NotFound(); // Recipe not found
            }

            return recipe;
        }

        // POST: api/Books
        [HttpPost]
        public void Post([FromBody] Recipe value)
        {
            RecipeHandler dh = new RecipeHandler();
            dh.SaveRecipe(value);
        }

        // PUT: api/Books/5
        [HttpPut("{id}")]
        public void Put([FromBody] Recipe value)
        {
            RecipeHandler dh = new RecipeHandler();
            dh.UpdateRecipe(value);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            RecipeHandler dh = new RecipeHandler();
            dh.DeleteRecipe(id);
        }
    }
}
